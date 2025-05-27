import React, {useState, useEffect, useRef, use} from 'react';
import VerticalCommentSlider from './VerticalCommentSlider';

const NutrientPDFViewer = (props) => {
  const [instance, setInstance] = useState(null);
  const containerRef = useRef(null);
  const toolbarHeightRef = useRef(null);
  const scrollElement = useRef(null)

  useEffect(() => {
    const container = containerRef.current;
    const {NutrientViewer} = window;

    if(container && NutrientViewer){
      NutrientViewer?.unload(container);
      NutrientViewer.load({
        container,
        document: props.document, // Replace with your PDF path
        // Optional: Enable comment functionality explicitly
        toolbarItems: NutrientViewer.defaultToolbarItems.concat([
          { type: "comment" }
        ])
      }).then(pspdfkitInstance => {
        setInstance(pspdfkitInstance);
        toolbarHeightRef.current = pspdfkitInstance?.contentDocument.getRootNode()?.querySelector(".PSPDFKit-Toolbar")?.offsetHeight;
        scrollElement.current = pspdfkitInstance?.contentDocument.getRootNode()?.querySelector(".PSPDFKit-Scroll")

        return () => {
          if (pspdfkitInstance) {
            NutrientViewer?.unload(container);
          }
        };
      });
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh', display: 'flex' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {instance && (
        <VerticalCommentSlider
          instance={instance}
          toolbarHeight = {toolbarHeightRef.current}
          scrollElement = {scrollElement.current}
        />
      )}
    </div>
  );
};

export default NutrientPDFViewer;
