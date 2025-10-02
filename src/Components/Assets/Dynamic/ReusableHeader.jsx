// ReusableHeader.jsx
import React from "react";
import { Button, Select } from "antd";
import { MdSearch } from "react-icons/md";
import { FaXmark, FaPlus } from "react-icons/fa6";

const ReusableHeader = ({
  title, // string or JSX for <h5>
  expanded, // state: true/false
  selectedValue, // state: current select value
  options = [], // ✅ array of options passed from parent
  onSearchClick, // fn
  onCloseClick, // fn
  onChange, // fn for Select
  onAddClick, // fn for "Add" button
  addButtonLabel = "Add", // optional label
}) => {
  return (
    <div className="d-flex w-100 justify-content-between align-items-center gap-3">
      {/* Title */}
      <h5 className="navy_Text fw-bold m-0 fs-4">{title}</h5>
      <div className="d-flex justify-content-between align-items-center gap-3">
        {/* Search Box */}
        <div className="SearchAnimate">
          <div className={`expandable-search ${expanded ? "expanded" : ""}`}>
            <Button
              icon={<MdSearch size={18} />}
              onClick={onSearchClick}
              className="search-icon-btn"
            />

            <div className="input-wrapper">
              <Select
                showSearch
                value={selectedValue}
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  option?.label?.toLowerCase().includes(input.toLowerCase())
                }
                filterSort={(a, b) =>
                  (a?.label ?? "")
                    .toLowerCase()
                    .localeCompare((b?.label ?? "").toLowerCase())
                }
                onChange={onChange}
                options={options}
              />
              <Button
                icon={<FaXmark />}
                onClick={onCloseClick}
                type="text"
                className="close-btn"
              />
            </div>
          </div>
        </div>

        {/* Add Button */}
        <Button type="primary" className="float-end" onClick={onAddClick}>
          <FaPlus /> {addButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default ReusableHeader;
