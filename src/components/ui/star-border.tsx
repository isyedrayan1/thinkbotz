const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = '#6C3EF5',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: any) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] w-full ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="relative z-10 bg-background/80 backdrop-blur border border-border rounded-[20px] w-full">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
