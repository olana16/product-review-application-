import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./component/MainContent";
import ProductPage from "./component/ProductPage";
import UpdateProduct from "./component/UpdateProduct";
import DeleteProduct from "./component/DeleteProduct";
import CreateProduct from "./component/CreateProduct";
import CreateReview from "./component/CreateRevies";
import UpdateReview from "./component/UpdateReview";
import DeleteReview from "./component/DeleteReview";

function App() {
  return (
    
      <div className="flex h-screen">
        {/* <Sidebar/> */}
        
        <div className="rounded w-full  flex justify-between flex-wrap">
          <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/updateproduct"  element={<UpdateProduct/>}/>
          <Route path="/deleteproduct"  element={<DeleteProduct/>}/>
          <Route path="/createreviews"  element={<CreateReview/>}/>
          <Route path="/updatereviews"  element={<UpdateReview/>}/>
          <Route path="/deletereviews"  element={<DeleteReview/>}/>
           
          </Routes>
          
          
        </div>
      </div>
    
  );
}

export default App;
