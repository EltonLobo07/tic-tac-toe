import { 
    useState,
    useEffect,
    useRef 
} from "react";

type BaseSerializable = 
    | string 
    | number 
    | boolean 
    | null 
    | Array<any>;

type Serializable = 
    | BaseSerializable 
    | Record<string, BaseSerializable>; 

type Args<TState> = {
    initialState: TState | (() => TState),
    lsKey: string
};

const INTERNAL_PREFIX = "_useLocalStorageState-";

function concatPrefix(arg: string): string {
    return INTERNAL_PREFIX + arg;
}

export function useLocalStorageState<TState extends Serializable>(args: Args<TState>) {
    const [state, setState] = useState(() => {
        const stateInLs = window.localStorage.getItem(concatPrefix(args.lsKey));
        if (stateInLs !== null) {
            return JSON.parse(stateInLs);
        }
        return typeof args.initialState === "function" ? args.initialState() : args.initialState;
    });
    const lsKeyRef = useRef(args.lsKey);

    useEffect(() => {
        if (lsKeyRef.current !== args.lsKey) {
            lsKeyRef.current = args.lsKey;
        }
        window.localStorage.setItem(concatPrefix(lsKeyRef.current), JSON.stringify(state));
    }, [state, args.lsKey]);

    useEffect(() => {
        return () => {
            window.localStorage.removeItem(concatPrefix(lsKeyRef.current));
        };
    }, []);

    return [state, setState];
}
