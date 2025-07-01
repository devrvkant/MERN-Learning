import { Shield } from "lucide-react";
import { cn } from "../../lib/utils";

const FullPageLoader = ({ className }) => {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
        className
      )}
    >
      <div className=" p-8 max-w-sm w-full mx-4">
        <div className="text-center space-y-6">
          {/* Animated Logo/Icon */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-inner">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            {/* Rotating ring */}
            <div className="absolute -inset-2 border-4 border-transparent border-t-blue-400 border-r-purple-400 rounded-full animate-spin"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Checking Authentication...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
