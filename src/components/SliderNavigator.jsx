import React, {use, useCallback, useEffect, useRef, useState} from "react"

const SliderNavigator = ({
  comments,
  annotations,
  position,
  toolbarHeight,
  width,
  darkMode,
  highlightColor,
  scrollElement,
  instance
})=>{
  const [currentAnnotationIndex, setCurrentAnnotationIndex] = useState([]);
  const handleCommentIndicatorTopPosition = (index)=>{
    const top = annotations.map(annotation=>annotation?.clientBoundingBox?.top)

    console.log(annotations)
    return Math.max(1, top[index]) * 1.49
  }


  const goToNextAnnotation = () => {
    if (annotations.length === 0) return;

    const nextIndex = (currentAnnotationIndex + 1) % annotations.length; // Wrap around
    setCurrentAnnotationIndex(nextIndex);

    // Use the annotation's pageIndex, not the array index
    instance.jumpToRect(annotations[nextIndex].index, annotations[nextIndex].clientBoundingBox);
    instance.setEditingAnnotation(annotations[nextIndex].id);
  };

  const goToPreviousAnnotation = () => {
    if (annotations.length === 0) return;

    const prevIndex = currentAnnotationIndex === 0
      ? annotations.length - 1
      : currentAnnotationIndex - 1;
    setCurrentAnnotationIndex(prevIndex);

    // Use the annotation's pageIndex, not the array index
    instance.jumpToRect(annotations[prevIndex].index, annotations[prevIndex].clientBoundingBox);
    instance.setEditingAnnotation(annotations[prevIndex].id);
  };

  return ( <div className="comment-slider-container" style={{ position: 'relative', [position]: 0, top: 0, bottom: 0, width: `${width}px`, zIndex: 2, marginLeft: "10px"}}>
    {/* Navigation buttons at the top (same height as toolbar) */}
    <div className="comment-slider-nav" style={{
      display: 'flex',
      flexDirection: 'column',
      height: `${toolbarHeight}px`,
      width: `${width}px`,
      backgroundColor: darkMode ? '#444' : '#f9f9f9',
      borderBottom: '1px solid #e0e0e0'
    }}>
      {/* Previous Comment Button */}
      <button
        onClick={goToPreviousAnnotation}
        className="comment-nav-button"
        style={{
          flex: 1,
          height: `${toolbarHeight}px`,
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
          stroke={darkMode ? '#fff' : '#555'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Next Comment Button */}
      <button
        onClick={goToNextAnnotation}
        className="comment-nav-button"
        style={{
          flex: 1,
          height: `${toolbarHeight}px`,
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
          stroke={darkMode ? '#fff' : '#555'}
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
        top: `${toolbarHeight}px`, // Position below the navigation buttons
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '',
        boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
      }}
      onClick={()=>{}}
      onMouseDown={()=>{}}
    >
      {/* Comment distribution heatmap */}


      {/* Current page indicator */}

      {/* Comment indicators */}
      {comments?.map((pageComment, index) => (
        <div
          key={`comment-${pageComment.pageIndex}-${index}`}
          className="comment-indicator"
          style={{
            position: 'relative',
            left: 0,
            top:handleCommentIndicatorTopPosition(index),
            width: '100%',
            height: "5px",
            backgroundColor: highlightColor,
            borderRadius: '1px',
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={(e) => {

          }}
          onMouseEnter={()=>{}}
          onMouseLeave={()=>{}}
          title={`Comment-${pageComment.id}`}
        />
      ))}
    </div>

    {/* Comment preview popup */}

  </div>)
}
export default SliderNavigator
