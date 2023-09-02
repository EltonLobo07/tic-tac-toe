import { Dialog as HUIDialog } from '@headlessui/react';
import { ValidChild } from '../types/general';
import { twMerge } from 'tailwind-merge';

type Props = {
    open: boolean,
    onClose: () => void,
    children: ValidChild,
    className?: string
};

export type DialogProps = Props;

export function Dialog(props: Props) {
    return (
        <HUIDialog
            open = {props.open}
            onClose = {props.onClose}
        >
            <div
                className = "fixed inset-0 bg-black/50"
            ></div>
            <div
                className = "fixed inset-0 flex items-center"
            >
                <HUIDialog.Panel
                    className = {twMerge(
                        "w-full bg-almost-black-green relative",
                        props.className
                    )}
                >
                    {props.children}
                </HUIDialog.Panel>
            </div>
        </HUIDialog>
    );
}

Dialog.Title = HUIDialog.Title;
Dialog.Description = HUIDialog.Description;
