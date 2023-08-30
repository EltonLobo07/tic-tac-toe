import { Dialog as HUIDialog } from '@headlessui/react';
import { ValidChild } from '../type-helpers/general';
import { VisuallyHidden } from './VisuallyHidden';

type Props = {
    open: boolean,
    onClose: () => void,
    title: string,
    description?: string,
    children: ValidChild
};

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
                    className = "w-full bg-almost-black-green relative"
                >
                    <VisuallyHidden>
                        <HUIDialog.Title>
                            {props.title}
                        </HUIDialog.Title>
                        {
                            props.description
                            ?? (
                                <HUIDialog.Description>
                                    {props.description}
                                </HUIDialog.Description>
                            )
                        }
                    </VisuallyHidden>
                    {props.children}
                </HUIDialog.Panel>
            </div>
        </HUIDialog>
    );
}
