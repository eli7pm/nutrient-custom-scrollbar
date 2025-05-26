import NutrientPDFViewer from './components/NutrientPDFViewer.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Nutrient Viewer with Custom Comment Slider</h1>

      <NutrientPDFViewer
        document="comments-test.pdf"
        darkMode={false}
      />
    </div>
  );
}

export default App;
