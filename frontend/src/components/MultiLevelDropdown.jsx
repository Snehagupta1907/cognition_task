import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useCardContext } from "../context/CardContext";

const MultilevelDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const { grouping,ordering, actions } = useCardContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const handleGroupingChange = (event) => {
    const selectedGrouping = event.target.value;
    actions.setGrouping(selectedGrouping);
  };

  const handleOrderingChange = (event) => {
    const selectedOrdering = event.target.value;
    actions.setOrdering(selectedOrdering);
  };


  return (
    <div style={{ position: "relative" }} className="dark:bg-gray-800">
      <button
        ref={buttonRef}
        id="multiLevelDropdownButton"
        onClick={() => setIsOpen((prev) => !prev)}
        data-dropdown-toggle="multi-dropdown"
        className="text-black dark:text-white bg-white dark:bg-gray-700 focus:outline-none rounded-md text-sm px-3 py-2 text-center inline-flex items-center border border-gray-100 dark:border-gray-800 shadow-md"
        type="button"
      >
        <img
          className="mr-2.5"
          width="18"
          src="https://img.icons8.com/ios-glyphs/30/000000/horizontal-settings-mixer--v1.png"
          alt="horizontal-settings-mixer--v1"
        />
        Display
        {!isOpen ? (
          <FaChevronDown className="ml-4 text-gray-400 w-2.5" />
        ) : (
          <FaChevronUp className="ml-4 text-gray-400 w-2.5" />
        )}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            top: position.top + "px",
            left: position.left + "px",
          }}
          className="w-[300px] h-[100px] bg-white dark:bg-gray-800 rounded-md mt-2 z-50 shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6">
            <div className="flex justify-between">
              <label className="mt-3 ml-3 text-gray-500 dark:text-gray-400">
                Grouping
              </label>
              <select
                className="mt-3 mr-3 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:bg-black dark:text-gray-300"
                style={{ width: "90px" }}
                value={grouping}
                onChange={handleGroupingChange}
              >
                <option value="Status">Status</option>
                <option value="User">User</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
            <div className="flex justify-between">
              <label className="mt-5 ml-3 text-gray-500 dark:text-gray-400">
                Ordering
              </label>
              <select
                className="mt-5 mr-3 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:bg-black dark:text-gray-300"
                style={{ width: "90px" }}
                value={ordering}
                onChange={handleOrderingChange}
              >
                <option value="Priority">Priority</option>
                <option value="Title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultilevelDropdown;
