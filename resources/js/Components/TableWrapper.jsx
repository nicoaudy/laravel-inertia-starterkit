const TableWrapper = ({ children }) => {
  return (
    <div className="bg-white shadow rounded-sm my-2.5 overflow-x-auto">
      <table className="min-w-max w-full table-auto">{children}</table>
    </div>
  );
};

export default TableWrapper;
