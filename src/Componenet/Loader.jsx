import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbLoader3 } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <TbLoader3 className="text-[5rem] animate-spin text-green-600" />
      <Skeleton height={30} width={200} />
      <Skeleton height={20} width={150} />
    </div>
  );
};

export default Loader;
