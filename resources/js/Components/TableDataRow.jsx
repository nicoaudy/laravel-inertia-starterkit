const TableDataRow = ({ children, ...props }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100" {...props}>
      {children}
    </tr>
  );
};

export default TableDataRow;
