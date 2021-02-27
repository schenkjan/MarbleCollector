import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

const pages = ["chores", "rewards", "profile"];

export function useDashboardBasePath() {
    const [basePath, setBasePath] = useState<string>();
    const {path, } = useRouteMatch();

    useEffect(() => {
        const pathParts = path.split("/");

        setBasePath(pathParts.filter(part => !pages.includes(part)).join("/"));
    }, [path]);

    return basePath;
}