import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ image, title, path }) => {
  const navigate = useNavigate();

  return (
    <Link to={path}>
      <div
    
      onClick={()=>navigate(path)} 
      className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 hover:shadow-md transition cursor-pointer h-35">
        
        <div className="w-20 h-20 flex items-center justify-center">
          <img src={image} alt={title} className="object-contain h-20" />
        </div>

        <p className="text-sm font-medium mt-2 text-gray-700 text-center">
          {title}
        </p>

      </div>
    </Link>
  );
};

export default ServiceCard;