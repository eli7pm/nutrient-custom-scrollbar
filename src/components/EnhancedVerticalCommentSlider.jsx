import {use, useCallback, useEffect, useState} from "react";
import SliderNavigator from "./SliderNavigator.jsx";
import "./slider-styles.css";

/**
 * Improved Vertical Comment Slider for NutrientViewer
 *
 * A vertical slider that navigates through the document and highlights comment threads,
 * with navigation buttons at the top matching the toolbar height.
 *
 * Props:
 * - instance: The NutrientViewer instance object
 * - width: Width of the slider (default: 24px)
 * - position: Position of the slider ('left' or 'right', default: 'right')
 * - highlightColor: Color for comment indicators (default: '#FF9900')
 * - showPreviews: Whether to show comment previews on hover (default: true)
 * - darkMode: Whether to use dark mode styling (default: false)
 * - toolbarHeight: Height of the main toolbar (default: 40px)
 */
const EnhancedVerticalCommentSlider = ({
                                         instance,
                                         width,
                                         position,
                                         highlightColor,
                                         showPreviews = true,
                                         darkMode = false,
                                         toolbarHeight,
                                         scrollElement
                                       }) => {
const [comments, setComments] = useState(null);
const [commentMarkerAnnotations, setCommentMarkerAnnotations] = useState([]);

const getComments = useCallback(async ()=>{
  const allComments = await instance.getComments()
  setComments(allComments)
  return allComments
},[]);

const getAnnotations = useCallback(async(commentsData)=>{
  if(commentsData?.size === 0) return

  const commentMarkerAnnotations = (await Promise.all(
    Array.from({
      length: commentsData?.size
    }).map((_, pageIndex) => instance.getAnnotations(pageIndex))
  )).flatMap(annotations=>annotations.reduce((acc, annotation)=>{
    return acc.concat(annotation)
  }, [])).filter(annotation => annotation.isCommentThreadRoot).map(annotation=>{

    return {
      id: annotation?.id,
      index: annotation?.pageIndex,
      clientBoundingBox: instance.transformPageToClientSpace(annotation.boundingBox, annotation?.pageIndex)
    }
  })
  setCommentMarkerAnnotations(commentMarkerAnnotations)
    console.log("in source component", commentsData.size )
},[]);


  useEffect(() => {
    (async()=>{
      const allComments = await getComments()
      await getAnnotations(allComments)
    })()
  }, []);

  return (
   <SliderNavigator
     comments={comments}
     annotations={commentMarkerAnnotations}
     position="right"
     width={34}
     highlightColor="#f19431"
     toolbarHeight={toolbarHeight}
     scrollElement={scrollElement}
     instance={instance}
   />
  );
};

export default EnhancedVerticalCommentSlider;
