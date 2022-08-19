import React from "react";

export function LeftArrowIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-[${props.height}] w-[${props.width}] `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
            />
        </svg>
    )
}

export function RightArrowIcon(props) {
    return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-[${props.height}] w-[${props.width}] `}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
        />
    </svg>
    )
};