import React from 'react';

const Button = ({ children, variant = 'primary', icon: Icon, className = '', ...props }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-white text-green-700 border border-green-600 hover:bg-green-50",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;