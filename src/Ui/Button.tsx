const Button = ({
  btnName,
  cs = 'px-6 bg-primary',
}: {
  btnName: string;
  cs?: string;
}) => {
  return (
    <button
      className={` ${cs} btn flex justify-center rounded  py-2   font-medium text-gray hover:shadow-1`}
      type="submit"
    >
      {btnName}
    </button>
  );
};

export default Button;
