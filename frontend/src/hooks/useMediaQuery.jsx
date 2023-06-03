import { useState, useEffect } from "react";

const useMediaQuery = (size) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${size}px)`);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, size]);

    return matches;
}

export default useMediaQuery;