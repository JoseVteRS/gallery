import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, Path } from "react-hook-form";

interface FormInputFieldProps<T extends Record<string, any>> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
}

export const FormInputField = <T extends Record<string, any>>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  className,
  inputClassName,
}: FormInputFieldProps<T>) => {
  return (
    <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              className={inputClassName}
              {...field}
            />
          </>
        )}
      />
    </div>
  );
};