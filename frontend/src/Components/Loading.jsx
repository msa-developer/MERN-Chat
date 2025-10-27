import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid min-h-screen place-items-center">
      <LoaderCircle className="animate-spin" size={50} />
    </div>
  );
};

export default Loading;
