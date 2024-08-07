"use client";

const tabs = [
  { name: "Boards", path: "boards" },
  { name: "List", path: "list" },
  { name: "Other", path: "other1" },
  { name: "Other", path: "other2" },
  { name: "Other", path: "other3" },
  { name: "Other", path: "other4" },
  { name: "Other", path: "other5" },
];

export default function NavigationTabs() {
  const handleTabClick = (tabPath: any) => {};

  return (
    <div className="flex border border-[#D0D5DD] rounded-md shadow-sm overflow-hidden">
      {tabs.map((tabItem, index) => (
        <button
          key={tabItem.path}
          onClick={() => handleTabClick(tabItem.path)}
          className={` bg-[#FFFFFF] hover:bg-[#d4d4d4] transition-all duration-200 ease-in-out ${
            index < tabs.length - 1 ? "border-r border-[#D0D5DD]" : ""
          }   ${
            index == 0 ? "text-[#145389] font-bold" : "text-[#344054]"
          }     py-2 px-3`}
        >
          {tabItem.name}
        </button>
      ))}
    </div>
  );
}
