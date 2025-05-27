import React, { useCallback, useEffect, useState } from "react";
import './slider-styles.css';

/**
 * Vertical Comment Slider for NutrientViewer
 *
 * A vertical slider that navigates through the document and highlights comment threads,
 * with navigation buttons at the top matching the toolbar height.
 */
const VerticalCommentSlider = ({
                                   instance,
                                   toolbarHeight = 40,
                                   scrollElement
                               }) => {
    const [commentMarkerAnnotations, setCommentMarkerAnnotations] = useState([]);
    const [currentAnnotation, setCurrentAnnotation] = useState(null);


    const getAnnotations = useCallback(async () => {

        const annotations = (await Promise.all(
            Array.from({
                length: instance.totalPageCount
            }).map((_, pageIndex) => instance.getAnnotations(pageIndex))
        ))
            .flatMap(annotations => annotations.reduce((acc, annotation) => {
                return acc.concat(annotation);
            }, []))
            .filter(annotation => annotation.isCommentThreadRoot)
            .map(annotation => ({
                id: annotation?.id,
                pageIndex: annotation?.pageIndex,
                clientBoundingBox: instance.transformPageToClientSpace(annotation.boundingBox, annotation?.pageIndex),
                boundingBox: annotation.boundingBox
            }))
            .sort((a, b) => a.clientBoundingBox.top - b.clientBoundingBox.top);

        setCommentMarkerAnnotations(annotations);
    }, []);

    const handleCommentIndicatorTopPosition = (id) => {
        const top = commentMarkerAnnotations.find(annotation=>annotation.id === id).clientBoundingBox.top

        return (top / (scrollElement.clientHeight)) * 100;
    };

  const goToIndex = (pageComment, event) => {
    if (commentMarkerAnnotations.length === 0) return;

    event.stopPropagation();

    // Use the clamped index, not currentAnnotationIndex
   instance.setSelectedAnnotations(pageComment.id);
    instance.jumpToRect(
      pageComment.pageIndex,
      pageComment.boundingBox
    );
    setCurrentAnnotation(pageComment);
  };

    useEffect(() => {
        (async () => {
            await getAnnotations();
          instance.addEventListener("annotationSelection.change", annotation=>{
            if(annotation) setCurrentAnnotation(annotation.get(0))
          })
        })();
        return ()=>{
          instance.removeEventListener("annotationSelection.change", (a)=>{})
        }
    }, []);

    return (
        <div
            className="comment-slider-container"
            style={{
                position: 'relative',
                right: 0,
                top: 0,
                bottom: 0,
                width: '34px',
                zIndex: 2,
                marginLeft: "10px"
            }}
        >
            {/* Navigation buttons at the top (same height as toolbar) */}
            <div
                className="comment-slider-nav"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: `${toolbarHeight}px`,
                    width: '34px',
                    backgroundColor: '#f9f9f9',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                {/* Previous Comment Button */}
                <button
                    onClick={(e) => {
                      if (commentMarkerAnnotations.length === 0) return;
                      if (!currentAnnotation) {
                        goToIndex(commentMarkerAnnotations[0], e);
                        return;
                      }
                      const currentIndex = commentMarkerAnnotations.findIndex(a => a.id === currentAnnotation.id);
                      const prevIndex = Math.max(0, currentIndex - 1);
                      goToIndex(commentMarkerAnnotations[prevIndex], e);
                    }}
                    className="comment-nav-button"
                    style={{
                        flex: 1,
                        height: `${toolbarHeight / 2}px`,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRight: '1px solid #e0e0e0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',
                        padding: 0
                    }}
                    aria-label="Previous comment"
                    title="Previous comment"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </button>

                {/* Next Comment Button */}
                <button
                    onClick={(e) => {
                      if (commentMarkerAnnotations.length === 0) return;
                      if (!currentAnnotation) {
                        goToIndex(commentMarkerAnnotations[0], e);
                        return;
                      }
                      const currentIndex = commentMarkerAnnotations.findIndex(a => a.id === currentAnnotation.id);
                      const nextIndex = Math.min(commentMarkerAnnotations.length - 1, currentIndex + 1);
                      goToIndex(commentMarkerAnnotations[nextIndex], e);
                    }}
                    className="comment-nav-button"
                    style={{
                        flex: 1,
                        height: `${toolbarHeight / 2}px`,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',
                        padding: 0
                    }}
                    aria-label="Next comment"
                    title="Next comment"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#555"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>

            {/* The slider itself */}
            <div
                className="nutrient-vertical-comment-slider"
                style={{
                    position: 'absolute',
                    top: `${toolbarHeight}px`,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '',
                    boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer'
                }}
            >
                {/* Comment indicators */}
                {commentMarkerAnnotations?.map((pageComment, index) => (
                    <div
                        key={`comment-${pageComment.id}-${index}`}
                        className="comment-indicator"
                        style={{
                            position: 'relative',
                            left: 0,
                            top: handleCommentIndicatorTopPosition(pageComment.id) + "px",
                            width: '100%',
                            height: "5px",
                            backgroundColor: "#f19431",
                            borderRadius: '1px',
                            cursor: 'pointer',
                            zIndex: 2,
                        }}
                        onClick={(e) => goToIndex(pageComment, e)}
                        title={`Comment-${pageComment.id}-${pageComment.pageIndex}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default VerticalCommentSlider;
