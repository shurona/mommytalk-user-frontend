import React from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white px-[25px] pt-[5px] pb-[5px] flex items-center justify-center relative border-b border-[#f0f0f0]">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/b02f1aa435ad4f110bf8f23ec72402b7180f26ff?width=220"
        alt="Mommytalk English 2"
        className="h-auto w-[60px] object-contain"
      />
      <button
        onClick={() => navigate("/profile")}
        className="absolute right-[25px] w-[25px] h-[25px] flex items-center justify-center"
        aria-label="More options"
      >
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 0.5C5.58929 0.5 0 6.08929 0 13C0 19.9107 5.58929 25.5 12.5 25.5C19.4107 25.5 25 19.9107 25 13C25 6.08929 19.4107 0.5 12.5 0.5ZM12.5 23.7143C6.58929 23.7143 1.78571 18.9107 1.78571 13C1.78571 7.08929 6.58929 2.28571 12.5 2.28571C18.4107 2.28571 23.2143 7.08929 23.2143 13C23.2143 18.9107 18.4107 23.7143 12.5 23.7143Z"
            fill="#888888"
          />
          <path
            d="M6.25007 14.7857C7.23629 14.7857 8.03578 13.9862 8.03578 13C8.03578 12.0138 7.23629 11.2143 6.25007 11.2143C5.26385 11.2143 4.46436 12.0138 4.46436 13C4.46436 13.9862 5.26385 14.7857 6.25007 14.7857Z"
            fill="#888888"
          />
          <path
            d="M18.7498 14.7857C19.736 14.7857 20.5355 13.9862 20.5355 13C20.5355 12.0138 19.736 11.2143 18.7498 11.2143C17.7636 11.2143 16.9641 12.0138 16.9641 13C16.9641 13.9862 17.7636 14.7857 18.7498 14.7857Z"
            fill="#888888"
          />
          <path
            d="M12.4998 14.7857C13.486 14.7857 14.2855 13.9862 14.2855 13C14.2855 12.0138 13.486 11.2143 12.4998 11.2143C11.5136 11.2143 10.7141 12.0138 10.7141 13C10.7141 13.9862 11.5136 14.7857 12.4998 14.7857Z"
            fill="#888888"
          />
        </svg>
      </button>
    </header>
  );
}

export default Header;
