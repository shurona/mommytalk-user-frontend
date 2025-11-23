import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isRecords =
    pathname.startsWith("/records") ||
    pathname.startsWith("/sentence") ||
    pathname.startsWith("/mommytalk365");
  const firstActive = !isRecords; // "내문장" (dashboard) active when not on records
  const secondActive = isRecords; // "기록" active on records

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[55px] bg-white flex items-start justify-center px-[84px] py-[8px] gap-[141px] border-t border-[#fff]">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex flex-col items-center gap-[5px]"
        aria-current={firstActive ? "page" : undefined}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 11V14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14V11H14C14.2833 11 14.5208 10.9042 14.7125 10.7125C14.9042 10.5208 15 10.2833 15 10C15 9.71667 14.9042 9.47917 14.7125 9.2875C14.5208 9.09583 14.2833 9 14 9H11V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V9H6C5.71667 9 5.47917 9.09583 5.2875 9.2875C5.09583 9.47917 5 9.71667 5 10C5 10.2833 5.09583 10.5208 5.2875 10.7125C5.47917 10.9042 5.71667 11 6 11H9ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
            fill={firstActive ? "#FF9B00" : "#D1D6DB"}
          />
        </svg>
        <span
          className={
            firstActive
              ? "text-[#FF9B00] text-center text-[10px] font-medium whitespace-nowrap"
              : "text-[#888] text-center text-[10px] font-medium whitespace-nowrap"
          }
        >
          내문장
        </span>
      </button>

      <button
        onClick={() => navigate("/records")}
        className="flex flex-col items-center gap-[5px]"
        aria-current={secondActive ? "page" : undefined}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.11111 8.44444C1.53056 8.44444 1.03356 8.23773 0.620139 7.82431C0.206713 7.41088 0 6.91389 0 6.33333V2.11111C0 1.53056 0.206713 1.03356 0.620139 0.620139C1.03356 0.206713 1.53056 0 2.11111 0H16.8889C17.4694 0 17.9664 0.206713 18.3799 0.620139C18.7933 1.03356 19 1.53056 19 2.11111V6.33333C19 6.91389 18.7933 7.41088 18.3799 7.82431C17.9664 8.23773 17.4694 8.44444 16.8889 8.44444H2.11111ZM2.11111 19C1.53056 19 1.03356 18.7933 0.620139 18.3799C0.206713 17.9664 0 17.4694 0 16.8889V12.6667C0 12.0861 0.206713 11.5891 0.620139 11.1757C1.03356 10.7623 1.53056 10.5556 2.11111 10.5556H16.8889C17.4694 10.5556 17.9664 10.7623 18.3799 11.1757C18.7933 11.5891 19 12.0861 19 12.6667V16.8889C19 17.4694 18.7933 17.9664 18.3799 18.3799C17.9664 18.7933 17.4694 19 16.8889 19H2.11111Z"
            fill={secondActive ? "#FF9B00" : "#D1D6DB"}
          />
        </svg>
        <span
          className={
            secondActive
              ? "text-[#FF9B00] text-center text-[10px] font-medium whitespace-nowrap"
              : "text-[#888] text-center text-[10px] font-medium whitespace-nowrap"
          }
        >
          기록
        </span>
      </button>
    </nav>
  );
}

export default BottomNav;
