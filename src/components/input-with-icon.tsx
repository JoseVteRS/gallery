import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";
import { FC, InputHTMLAttributes } from "react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: keyof typeof Icons;
  iconPosition?: "left" | "right";
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
}

const InputWithIcon: FC<InputWithIconProps> = ({
  id,
  type,
  placeholder,
  icon,
  iconPosition = "right",
  showPassword,
  setShowPassword,
  ...rest
}) => {
  const IconComponent = Icons[icon] as Icons.LucideIcon;

  return (
    <div className="relative">
      {iconPosition === "left" && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 p-1">
          <IconComponent className="size-5 text-zinc-500" />
        </div>
      )}
      <Input
        id={id}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        className={`w-full ${iconPosition === "left" ? "pl-10" : "pr-10"}`}
        {...rest}
      />
      {iconPosition === "right" && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 p-1">
          {type === "password" && setShowPassword ? (
            <button onClick={() => setShowPassword(!showPassword)}>
              <IconComponent className="size-5 text-zinc-500" />
            </button>
          ) : (
            <IconComponent className="size-5 text-zinc-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default InputWithIcon;
