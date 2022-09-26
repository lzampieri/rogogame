import { useMediaQuery } from 'react-responsive';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config'; // Your tailwind config

const fullTailwindConfig = resolveConfig( tailwindConfig );
const tailwindBreakpoints = fullTailwindConfig.theme.screens;

export function useBreakpoint( k ) {
    return useMediaQuery({
        query: `(min-width: ${ tailwindBreakpoints[ k ] } )`,
    });
}