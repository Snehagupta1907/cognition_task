import MultilevelDropdown from "./MultiLevelDropdown";

import Switcher from "./Switcher";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-white text-white  border-gray-200 dark:bg-gray-900">
      <MultilevelDropdown />
      <div className="flex items-center">
        <Switcher />
      </div>
    </nav>
  );
};

export default Navbar;
