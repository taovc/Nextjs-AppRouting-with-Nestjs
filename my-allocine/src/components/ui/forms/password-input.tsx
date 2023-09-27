import React, { InputHTMLAttributes, useState } from "react";
import cn from "classnames";
import { Eye } from "@/components/icons/eye-icon";
import { EyeOff } from "@/components/icons/eye-off-icon";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label: string;
  name?: string;
  forgotPageLink?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
  dimension?: "small" | "medium" | "big";
  forgotPageRouteOnClick?: () => void;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent",
  outline: "border border-border-base rounded focus:border-accent",
  line: "ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent",
};

const sizeClasses = {
  small: "text-sm h-9",
  medium: "h-12",
  big: "h-14",
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      label,
      name,
      error,
      children,
      variant = "normal",
      dimension = "medium",
      shadow = false,
      type = "text",
      forgotPageLink = "",
      forgotPageRouteOnClick,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={name} className="font-semibold text-sm text-body">
            {label}
          </label>
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={cn(
              "flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-none focus:ring-0",
              shadow && "focus:shadow",
              variantClasses[variant],
              sizeClasses[dimension],
              inputClassName
            )}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute ltr:right-4 rtl:left-4 top-5 -mt-2 text-body cursor-pointer right-4"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </label>
        </div>
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
