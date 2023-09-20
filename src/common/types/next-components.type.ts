import { ReactNode } from "react";

export type ErrorProps<T> = { error: T; reset?: () => void };

export type LayoutProps = { children: ReactNode };
