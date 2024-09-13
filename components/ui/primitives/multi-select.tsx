"use client";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { clamp } from '@radix-ui/number';
import { composeEventHandlers } from '@radix-ui/primitive';
import { createCollection } from '@radix-ui/react-collection';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { useDirection } from '@radix-ui/react-direction';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { useFocusGuards } from '@radix-ui/react-focus-guards';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { useId } from '@radix-ui/react-id';
import * as PopperPrimitive from '@radix-ui/react-popper';
import { createPopperScope } from '@radix-ui/react-popper';
import { Portal as PortalPrimitive } from '@radix-ui/react-portal';
import { Primitive } from '@radix-ui/react-primitive';
import { Slot } from '@radix-ui/react-slot';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { usePrevious } from '@radix-ui/react-use-previous';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { hideOthers } from 'aria-hidden';
import { RemoveScroll } from 'react-remove-scroll';

import type { Scope } from '@radix-ui/react-context';
import TextMuted from "@/components/ui/typography/text-muted";

type Direction = 'ltr' | 'rtl';

const OPEN_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown'];
const SELECTION_KEYS = [' ', 'Enter'];

/* -------------------------------------------------------------------------------------------------
 * Multi Select
 * -----------------------------------------------------------------------------------------------*/

const MULTI_SELECT_NAME = 'MultiSelect';

type ItemData = { value: string; disabled: boolean; textValue: string };
const [Collection, useCollection, createCollectionScope] = createCollection<
    MultiSelectItemElement,
    ItemData
>(MULTI_SELECT_NAME);

type ScopedProps<P> = P & { __scopeSelect?: Scope };
const [createMultiSelectContext, createMultiSelectScope] = createContextScope(MULTI_SELECT_NAME, [
    createCollectionScope,
    createPopperScope,
]);
const usePopperScope = createPopperScope();

type MultiSelectContextValue = {
    trigger: MultiSelectTriggerElement | null;
    onTriggerChange(node: MultiSelectTriggerElement | null): void;
    valueNode: MultiSelectValueElement | null;
    onValueNodeChange(node: MultiSelectValueElement): void;
    valueNodeHasChildren: boolean;
    onValueNodeHasChildrenChange(hasChildren: boolean): void;
    contentId: string;
    value?: string[];
    onValueChange(value: string[]): void;
    open: boolean;
    required?: boolean;
    onOpenChange(open: boolean): void;
    dir: MultiSelectProps['dir'];
    triggerPointerDownPosRef: React.MutableRefObject<{ x: number; y: number } | null>;
    disabled?: boolean;
};

const [MultiSelectProvider, useMultiSelectContext] = createMultiSelectContext<MultiSelectContextValue>(MULTI_SELECT_NAME);

type NativeOption = React.ReactElement<React.ComponentProps<'option'>>;

type MultiSelectNativeOptionsContextValue = {
    onNativeOptionAdd(option: NativeOption): void;
    onNativeOptionRemove(option: NativeOption): void;
};
const [MultiSelectNativeOptionsProvider, useMultiSelectNativeOptionsContext] =
    createMultiSelectContext<MultiSelectNativeOptionsContextValue>(MULTI_SELECT_NAME);

interface MultiSelectProps {
    children?: React.ReactNode;
    value?: string[];
    defaultValue?: string[];
    onValueChange?(value: string[]): void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
    dir?: Direction;
    name?: string;
    autoComplete?: string;
    disabled?: boolean;
    required?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = (props: ScopedProps<MultiSelectProps>) => {
    const {
        __scopeSelect,
        children,
        open: openProp,
        defaultOpen,
        onOpenChange,
        value: valueProp,
        defaultValue,
        onValueChange,
        dir,
        name,
        autoComplete,
        disabled,
        required,
    } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const [trigger, setTrigger] = React.useState<MultiSelectTriggerElement | null>(null);
    const [valueNode, setValueNode] = React.useState<MultiSelectValueElement | null>(null);
    const [valueNodeHasChildren, setValueNodeHasChildren] = React.useState(false);
    const direction = useDirection(dir);
    const [open = false, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange,
    });
    const [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
    });
    const triggerPointerDownPosRef = React.useRef<{ x: number; y: number } | null>(null);

    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = trigger ? Boolean(trigger.closest('form')) : true;
    const [nativeOptionsSet, setNativeOptionsSet] = React.useState(new Set<NativeOption>());

    // The native `select` only associates the correct default value if the corresponding
    // `option` is rendered as a child **at the same time** as itself.
    // Because it might take a few renders for our items to gather the information to build
    // the native `option`(s), we generate a key on the `select` to make sure React re-builds it
    // each time the options change.
    const nativeSelectKey = Array.from(nativeOptionsSet)
        .map((option) => option.props.value)
        .join(';');

    const handleSelect = (selectedItem:string) => {
        const currentValues = value ?? [];

        if (currentValues.includes(selectedItem)) {
            setValue(currentValues.filter((value) => value !== selectedItem));
            return;
        }

        setValue([...currentValues, selectedItem]);
    };

    return (
        <PopperPrimitive.Root {...popperScope}>
            <MultiSelectProvider
                required={required}
                scope={__scopeSelect}
                trigger={trigger}
                onTriggerChange={setTrigger}
                valueNode={valueNode}
                onValueNodeChange={setValueNode}
                valueNodeHasChildren={valueNodeHasChildren}
                onValueNodeHasChildrenChange={setValueNodeHasChildren}
                contentId={useId()}
                value={value}
                onValueChange={setValue}
                open={open}
                onOpenChange={setOpen}
                dir={direction}
                triggerPointerDownPosRef={triggerPointerDownPosRef}
                disabled={disabled}
            >
                <Collection.Provider scope={__scopeSelect}>
                    <MultiSelectNativeOptionsProvider
                        scope={props.__scopeSelect}
                        onNativeOptionAdd={React.useCallback((option) => {
                            setNativeOptionsSet((prev) => new Set(prev).add(option));
                        }, [])}
                        onNativeOptionRemove={React.useCallback((option) => {
                            setNativeOptionsSet((prev) => {
                                const optionsSet = new Set(prev);
                                optionsSet.delete(option);
                                return optionsSet;
                            });
                        }, [])}
                    >
                        {children}
                    </MultiSelectNativeOptionsProvider>
                </Collection.Provider>

                {isFormControl ? (
                    <BubbleMultiSelect
                        key={nativeSelectKey}
                        aria-hidden
                        required={required}
                        tabIndex={-1}
                        name={name}
                        autoComplete={autoComplete}
                        value={value}
                        // enable form autofill
                        onChange={(event) => handleSelect(event.target.value)}
                        disabled={disabled}
                    >
                        {value === undefined ? <option value="" /> : null}
                        {Array.from(nativeOptionsSet)}
                    </BubbleMultiSelect>
                ) : null}
            </MultiSelectProvider>
        </PopperPrimitive.Root>
    );
};

MultiSelect.displayName = MULTI_SELECT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectTrigger
 * -----------------------------------------------------------------------------------------------*/

const TRIGGER_NAME = 'MultiSelectTrigger';

type MultiSelectTriggerElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface MultiSelectTriggerProps extends PrimitiveButtonProps {}

const MultiSelectTrigger = React.forwardRef<MultiSelectTriggerElement, MultiSelectTriggerProps>(
    (props: ScopedProps<MultiSelectTriggerProps>, forwardedRef) => {
        const { __scopeSelect, disabled = false, ...triggerProps } = props;
        const popperScope = usePopperScope(__scopeSelect);
        const context = useMultiSelectContext(TRIGGER_NAME, __scopeSelect);
        const isDisabled = context.disabled || disabled;
        const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
        const getItems = useCollection(__scopeSelect);
        const pointerTypeRef = React.useRef<React.PointerEvent['pointerType']>('touch');

        const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
            const enabledItems = getItems().filter((item) => !item.disabled);
            const nextItem = findNextItem(enabledItems, search);
            if (nextItem !== undefined) {
                const currentValues = context.value ?? [];
                const selectedItem = nextItem.value;

                if (currentValues.includes(selectedItem)) {
                    context.onValueChange(currentValues.filter((value) => value !== selectedItem));
                    return;
                }

                context.onValueChange([...currentValues, selectedItem]);
            }
        });

        const handleOpen = (pointerEvent?: React.MouseEvent | React.PointerEvent) => {
            if (!isDisabled) {
                context.onOpenChange(true);
                // reset typeahead when we open
                resetTypeahead();
            }

            if (pointerEvent) {
                context.triggerPointerDownPosRef.current = {
                    x: Math.round(pointerEvent.pageX),
                    y: Math.round(pointerEvent.pageY),
                };
            }
        };

        return (
            <PopperPrimitive.Anchor asChild {...popperScope}>
                <Primitive.button
                    type="button"
                    role="combobox"
                    aria-controls={context.contentId}
                    aria-expanded={context.open}
                    aria-required={context.required}
                    aria-autocomplete="none"
                    dir={context.dir}
                    data-state={context.open ? 'open' : 'closed'}
                    disabled={isDisabled}
                    data-disabled={isDisabled ? '' : undefined}
                    data-placeholder={shouldShowPlaceholder(context.value) ? '' : undefined}
                    {...triggerProps}
                    ref={composedRefs}
                    // Enable compatibility with native label or custom `Label` "click" for Safari:
                    onClick={composeEventHandlers(triggerProps.onClick, (event) => {
                        // Whilst browsers generally have no issue focusing the trigger when clicking
                        // on a label, Safari seems to struggle with the fact that there's no `onClick`.
                        // We force `focus` in this case. Note: this doesn't create any other side-effect
                        // because we are preventing default in `onPointerDown` so effectively
                        // this only runs for a label "click"
                        event.currentTarget.focus();

                        // Open on click when using a touch or pen device
                        if (pointerTypeRef.current !== 'mouse') {
                            handleOpen(event);
                        }
                    })}
                    onPointerDown={composeEventHandlers(triggerProps.onPointerDown, (event) => {
                        pointerTypeRef.current = event.pointerType;

                        // prevent implicit pointer capture
                        // https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture
                        const target = event.target as HTMLElement;
                        if (target.hasPointerCapture(event.pointerId)) {
                            target.releasePointerCapture(event.pointerId);
                        }

                        // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
                        // but not when the control key is pressed (avoiding MacOS right click); also not for touch
                        // devices because that would open the menu on scroll. (pen devices behave as touch on iOS).
                        if (event.button === 0 && !event.ctrlKey && event.pointerType === 'mouse') {
                            handleOpen(event);
                            // prevent trigger from stealing focus from the active item after opening.
                            event.preventDefault();
                        }
                    })}
                    onKeyDown={composeEventHandlers(triggerProps.onKeyDown, (event) => {
                        const isTypingAhead = searchRef.current !== '';
                        const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                        if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                        if (isTypingAhead && event.key === ' ') return;
                        if (OPEN_KEYS.includes(event.key)) {
                            handleOpen();
                            event.preventDefault();
                        }
                    })}
                />
            </PopperPrimitive.Anchor>
        );
    }
);

MultiSelectTrigger.displayName = TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * Multi SelectValue
 * -----------------------------------------------------------------------------------------------*/

const VALUE_NAME = 'MultiSelectValue';

type MultiSelectValueElement = React.ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;
interface MultiSelectValueProps extends Omit<PrimitiveSpanProps, 'placeholder'> {
    placeholder?: React.ReactNode;
    label:string;
}

const MultiSelectValue = React.forwardRef<MultiSelectValueElement, MultiSelectValueProps>(
    (props: ScopedProps<MultiSelectValueProps>, forwardedRef) => {
        // We ignore `className` and `style` as this part shouldn't be styled.
        const {__scopeSelect, className, style, children, placeholder = '', label, ...valueProps} = props;
        const context = useMultiSelectContext(VALUE_NAME, __scopeSelect);
        const {onValueNodeHasChildrenChange} = context;
        const hasChildren = children !== undefined;
        const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);

        useLayoutEffect(() => {
            onValueNodeHasChildrenChange(hasChildren);
        }, [onValueNodeHasChildrenChange, hasChildren]);

        return (
            <>
                {context.value && context.value.length > 0 ?
                    <div className={'flex flex-col justify-start align-top text-start'}>
                        <TextMuted className={'text-xs'}>{label}</TextMuted>
                        {context.value && context.value?.length > 1
                            ?
                            <>{context.value?.length} Selected</>
                            :
                            <Primitive.span
                                {...valueProps}
                                ref={composedRefs}
                                // we don't want events from the portalled `SelectValue` children to bubble
                                // through the item they came from
                                style={{pointerEvents: 'none'}}
                            >
                                {shouldShowPlaceholder(context.value) ? <>{placeholder}</> : null}
                            </Primitive.span>
                        }
                    </div>
                    :
                    <TextMuted>{label}</TextMuted>
                }
            </>
        )
    }
);

MultiSelectValue.displayName = VALUE_NAME;

/* -------------------------------------------------------------------------------------------------
 * SelectIcon
 * -----------------------------------------------------------------------------------------------*/

const ICON_NAME = 'MultiSelectIcon';

type MultiSelectIconElement = React.ElementRef<typeof Primitive.span>;
interface MultiSelectIconProps extends PrimitiveSpanProps {}

const MultiSelectIcon = React.forwardRef<MultiSelectIconElement, MultiSelectIconProps>(
    (props: ScopedProps<MultiSelectIconProps>, forwardedRef) => {
        const { __scopeSelect, children, ...iconProps } = props;
        return (
            <Primitive.span aria-hidden {...iconProps} ref={forwardedRef}>
                {children || '▼'}
            </Primitive.span>
        );
    }
);

MultiSelectIcon.displayName = ICON_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = 'MultiSelectPortal';

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
interface MultiSelectPortalProps {
    children?: React.ReactNode;
    /**
     * Specify a container element to portal the content into.
     */
    container?: PortalProps['container'];
}

const MultiSelectPortal: React.FC<MultiSelectPortalProps> = (props: ScopedProps<MultiSelectPortalProps>) => {
    return <PortalPrimitive asChild {...props} />;
};

MultiSelectPortal.displayName = PORTAL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'MultiSelectContent';

type MultiSelectContentElement = MultiSelectContentImplElement;
interface MultiSelectContentProps extends MultiSelectContentImplProps {}

const MultiSelectContent = React.forwardRef<MultiSelectContentElement, MultiSelectContentProps>(
    (props: ScopedProps<MultiSelectContentProps>, forwardedRef) => {
        const context = useMultiSelectContext(CONTENT_NAME, props.__scopeSelect);
        const [fragment, setFragment] = React.useState<DocumentFragment>();

        // setting the fragment in `useLayoutEffect` as `DocumentFragment` doesn't exist on the server
        useLayoutEffect(() => {
            setFragment(new DocumentFragment());
        }, []);

        if (!context.open) {
            const frag = fragment as Element | undefined;
            return frag
                ? ReactDOM.createPortal(
                    <MultiSelectContentProvider scope={props.__scopeSelect}>
                        <Collection.Slot scope={props.__scopeSelect}>
                            <div>{props.children}</div>
                        </Collection.Slot>
                    </MultiSelectContentProvider>,
                    frag
                )
                : null;
        }

        return <MultiSelectContentImpl {...props} ref={forwardedRef} />;
    }
);

MultiSelectContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectContentImpl
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_MARGIN = 10;

type MultiSelectContentContextValue = {
    content?: MultiSelectContentElement | null;
    viewport?: MultiSelectViewportElement | null;
    onViewportChange?: (node: MultiSelectViewportElement | null) => void;
    itemRefCallback?: (node: MultiSelectItemElement | null, value: string, disabled: boolean) => void;
    selectedItem?: MultiSelectItemElement | null;
    onItemLeave?: () => void;
    itemTextRefCallback?: (
        node: MultiSelectItemTextElement | null,
        value: string,
        disabled: boolean
    ) => void;
    focusSelectedItem?: () => void;
    selectedItemText?: MultiSelectItemTextElement | null;
    position?: MultiSelectContentProps['position'];
    isPositioned?: boolean;
    searchRef?: React.RefObject<string>;
};

const [MultiSelectContentProvider, useMultiSelectContentContext] =
    createMultiSelectContext<MultiSelectContentContextValue>(CONTENT_NAME);

const CONTENT_IMPL_NAME = 'MultiSelectContentImpl';

type MultiSelectContentImplElement = MultiSelectPopperPositionElement | MultiSelectItemAlignedPositionElement;
type DismissableLayerProps = React.ComponentPropsWithoutRef<typeof DismissableLayer>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;

type MultiSelectPopperPrivateProps = { onPlaced?: PopperContentProps['onPlaced'] };

interface MultiSelectContentImplProps
    extends Omit<MultiSelectPopperPositionProps, keyof MultiSelectPopperPrivateProps>,
        Omit<MultiSelectItemAlignedPositionProps, keyof MultiSelectPopperPrivateProps> {
    /**
     * Event handler called when auto-focusing on close.
     * Can be prevented.
     */
    onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus'];
    /**
     * Event handler called when the escape key is down.
     * Can be prevented.
     */
    onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown'];
    /**
     * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
     * Can be prevented.
     */
    onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside'];

    position?: 'item-aligned' | 'popper';
}

const MultiSelectContentImpl = React.forwardRef<MultiSelectContentImplElement, MultiSelectContentImplProps>(
    (props: ScopedProps<MultiSelectContentImplProps>, forwardedRef) => {
        const {
            __scopeSelect,
            position = 'item-aligned',
            onCloseAutoFocus,
            onEscapeKeyDown,
            onPointerDownOutside,
            //
            // PopperContent props
            side,
            sideOffset,
            align,
            alignOffset,
            arrowPadding,
            collisionBoundary,
            collisionPadding,
            sticky,
            hideWhenDetached,
            avoidCollisions,
            //
            ...contentProps
        } = props;
        const context = useMultiSelectContext(CONTENT_NAME, __scopeSelect);
        const [content, setContent] = React.useState<MultiSelectContentImplElement | null>(null);
        const [viewport, setViewport] = React.useState<MultiSelectViewportElement | null>(null);
        const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
        const [selectedItem, setSelectedItem] = React.useState<MultiSelectItemElement | null>(null);
        const [selectedItemText, setSelectedItemText] = React.useState<MultiSelectItemTextElement | null>(
            null
        );
        const getItems = useCollection(__scopeSelect);
        const [isPositioned, setIsPositioned] = React.useState(false);
        const firstValidItemFoundRef = React.useRef(false);

        // aria-hide everything except the content (better supported equivalent to setting aria-modal)
        React.useEffect(() => {
            if (content) return hideOthers(content);
        }, [content]);

        // Make sure the whole tree has focus guards as our `Select` may be
        // the last element in the DOM (because of the `Portal`)
        useFocusGuards();

        const focusFirst = React.useCallback(
            (candidates: Array<HTMLElement | null>) => {
                const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
                const [lastItem] = restItems.slice(-1);

                const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
                for (const candidate of candidates) {
                    // if focus is already where we want to go, we don't want to keep going through the candidates
                    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
                    candidate?.scrollIntoView({ block: 'nearest' });
                    // viewport might have padding so scroll to its edges when focusing first/last items.
                    if (candidate === firstItem && viewport) viewport.scrollTop = 0;
                    if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
                    candidate?.focus();
                    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
                }
            },
            [getItems, viewport]
        );

        const focusSelectedItem = React.useCallback(
            () => focusFirst([selectedItem, content]),
            [focusFirst, selectedItem, content]
        );

        // Since this is not dependent on layout, we want to ensure this runs at the same time as
        // other effects across components. Hence why we don't call `focusSelectedItem` inside `position`.
        React.useEffect(() => {
            if (isPositioned) {
                focusSelectedItem();
            }
        }, [isPositioned, focusSelectedItem]);

        // prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
        // and close on `pointerup` outside.
        const { onOpenChange, triggerPointerDownPosRef } = context;
        React.useEffect(() => {
            if (content) {
                let pointerMoveDelta = { x: 0, y: 0 };

                const handlePointerMove = (event: PointerEvent) => {
                    pointerMoveDelta = {
                        x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
                        y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0)),
                    };
                };
                const handlePointerUp = (event: PointerEvent) => {
                    // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
                    if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
                        event.preventDefault();
                    } else {
                        // otherwise, if the event was outside the content, close.
                        if (!content.contains(event.target as HTMLElement)) {
                            onOpenChange(false);
                        }
                    }
                    document.removeEventListener('pointermove', handlePointerMove);
                    triggerPointerDownPosRef.current = null;
                };

                if (triggerPointerDownPosRef.current !== null) {
                    document.addEventListener('pointermove', handlePointerMove);
                    document.addEventListener('pointerup', handlePointerUp, { capture: true, once: true });
                }

                return () => {
                    document.removeEventListener('pointermove', handlePointerMove);
                    document.removeEventListener('pointerup', handlePointerUp, { capture: true });
                };
            }
        }, [content, onOpenChange, triggerPointerDownPosRef]);

        React.useEffect(() => {
            const close = () => onOpenChange(false);
            window.addEventListener('blur', close);
            window.addEventListener('resize', close);
            return () => {
                window.removeEventListener('blur', close);
                window.removeEventListener('resize', close);
            };
        }, [onOpenChange]);

        const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
            const enabledItems = getItems().filter((item) => !item.disabled);
            const nextItem = findNextItem(enabledItems, search);
            if (nextItem) {
                /**
                 * Imperative focus during keydown is risky so we prevent React's batching updates
                 * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
                 */
                setTimeout(() => (nextItem.ref.current as HTMLElement).focus());
            }
        });

        const itemRefCallback = React.useCallback(
            (node: MultiSelectItemElement | null, value: string, disabled: boolean) => {
                const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
                const isSelectedItem = context.value !== undefined && context.value !== null && context.value.length > 0 && context.value.includes(value);
                if (isSelectedItem || isFirstValidItem) {
                    setSelectedItem(node);
                    if (isFirstValidItem) firstValidItemFoundRef.current = true;
                }
            },
            [context.value]
        );
        const handleItemLeave = React.useCallback(() => content?.focus(), [content]);
        const itemTextRefCallback = React.useCallback(
            (node: MultiSelectItemTextElement | null, value: string, disabled: boolean) => {
                const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
                const isSelectedItem = context.value !== undefined && context.value !== null && context.value.length > 0 && context.value.includes(value);
                if (isSelectedItem || isFirstValidItem) {
                    setSelectedItemText(node);
                }
            },
            [context.value]
        );

        const MultiSelectPosition = position === 'popper' ? MultiSelectPopperPosition : MultiSelectItemAlignedPosition;

        // Silently ignore props that are not supported by `SelectItemAlignedPosition`
        const popperContentProps =
            MultiSelectPosition === MultiSelectPopperPosition
                ? {
                    side,
                    sideOffset,
                    align,
                    alignOffset,
                    arrowPadding,
                    collisionBoundary,
                    collisionPadding,
                    sticky,
                    hideWhenDetached,
                    avoidCollisions,
                }
                : {};

        return (
            <MultiSelectContentProvider
                scope={__scopeSelect}
                content={content}
                viewport={viewport}
                onViewportChange={setViewport}
                itemRefCallback={itemRefCallback}
                selectedItem={selectedItem}
                onItemLeave={handleItemLeave}
                itemTextRefCallback={itemTextRefCallback}
                focusSelectedItem={focusSelectedItem}
                selectedItemText={selectedItemText}
                position={position}
                isPositioned={isPositioned}
                searchRef={searchRef}
            >
                <RemoveScroll as={Slot} allowPinchZoom>
                    <FocusScope
                        asChild
                        // we make sure we're not trapping once it's been closed
                        // (closed !== unmounted when animating out)
                        trapped={context.open}
                        onMountAutoFocus={(event) => {
                            // we prevent open autofocus because we manually focus the selected item
                            event.preventDefault();
                        }}
                        onUnmountAutoFocus={composeEventHandlers(onCloseAutoFocus, (event) => {
                            context.trigger?.focus({ preventScroll: true });
                            event.preventDefault();
                        })}
                    >
                        <DismissableLayer
                            asChild
                            disableOutsidePointerEvents
                            onEscapeKeyDown={onEscapeKeyDown}
                            onPointerDownOutside={onPointerDownOutside}
                            // When focus is trapped, a focusout event may still happen.
                            // We make sure we don't trigger our `onDismiss` in such case.
                            onFocusOutside={(event) => event.preventDefault()}
                            onDismiss={() => context.onOpenChange(false)}
                        >
                            <MultiSelectPosition
                                role="listbox"
                                id={context.contentId}
                                data-state={context.open ? 'open' : 'closed'}
                                dir={context.dir}
                                onContextMenu={(event) => event.preventDefault()}
                                {...contentProps}
                                {...popperContentProps}
                                onPlaced={() => setIsPositioned(true)}
                                ref={composedRefs}
                                style={{
                                    // flex layout so we can place the scroll buttons properly
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // reset the outline by default as the content MAY get focused
                                    outline: 'none',
                                    ...contentProps.style,
                                }}
                                onKeyDown={composeEventHandlers(contentProps.onKeyDown, (event) => {
                                    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

                                    // select should not be navigated using tab key so we prevent it
                                    if (event.key === 'Tab') event.preventDefault();

                                    if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);

                                    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                                        const items = getItems().filter((item) => !item.disabled);
                                        let candidateNodes = items.map((item) => item.ref.current!);

                                        if (['ArrowUp', 'End'].includes(event.key)) {
                                            candidateNodes = candidateNodes.slice().reverse();
                                        }
                                        if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
                                            const currentElement = event.target as MultiSelectItemElement;
                                            const currentIndex = candidateNodes.indexOf(currentElement);
                                            candidateNodes = candidateNodes.slice(currentIndex + 1);
                                        }

                                        /**
                                         * Imperative focus during keydown is risky so we prevent React's batching updates
                                         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
                                         */
                                        setTimeout(() => focusFirst(candidateNodes));

                                        event.preventDefault();
                                    }
                                })}
                            />
                        </DismissableLayer>
                    </FocusScope>
                </RemoveScroll>
            </MultiSelectContentProvider>
        );
    }
);

MultiSelectContentImpl.displayName = CONTENT_IMPL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectItemAlignedPosition
 * -----------------------------------------------------------------------------------------------*/

const ITEM_ALIGNED_POSITION_NAME = 'MultiSelectItemAlignedPosition';

type MultiSelectItemAlignedPositionElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectItemAlignedPositionProps extends PrimitiveDivProps, MultiSelectPopperPrivateProps {}

const MultiSelectItemAlignedPosition = React.forwardRef<
    MultiSelectItemAlignedPositionElement,
    MultiSelectItemAlignedPositionProps
>((props: ScopedProps<MultiSelectItemAlignedPositionProps>, forwardedRef) => {
    const { __scopeSelect, onPlaced, ...popperProps } = props;
    const context = useMultiSelectContext(CONTENT_NAME, __scopeSelect);
    const contentContext = useMultiSelectContentContext(CONTENT_NAME, __scopeSelect);
    const [contentWrapper, setContentWrapper] = React.useState<HTMLDivElement | null>(null);
    const [content, setContent] = React.useState<MultiSelectItemAlignedPositionElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const getItems = useCollection(__scopeSelect);
    const shouldExpandOnScrollRef = React.useRef(false);
    const shouldRepositionRef = React.useRef(true);

    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    const position = React.useCallback(() => {
        if (
            context.trigger &&
            context.valueNode &&
            contentWrapper &&
            content &&
            viewport &&
            selectedItem &&
            selectedItemText
        ) {
            const triggerRect = context.trigger.getBoundingClientRect();

            // -----------------------------------------------------------------------------------------
            //  Horizontal positioning
            // -----------------------------------------------------------------------------------------
            const contentRect = content.getBoundingClientRect();
            const valueNodeRect = context.valueNode.getBoundingClientRect();
            const itemTextRect = selectedItemText.getBoundingClientRect();

            if (context.dir !== 'rtl') {
                const itemTextOffset = itemTextRect.left - contentRect.left;
                const left = valueNodeRect.left - itemTextOffset;
                const leftDelta = triggerRect.left - left;
                const minContentWidth = triggerRect.width + leftDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const rightEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedLeft = clamp(left, [CONTENT_MARGIN, rightEdge - contentWidth]);

                contentWrapper.style.minWidth = minContentWidth + 'px';
                contentWrapper.style.left = clampedLeft + 'px';
            } else {
                const itemTextOffset = contentRect.right - itemTextRect.right;
                const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
                const rightDelta = window.innerWidth - triggerRect.right - right;
                const minContentWidth = triggerRect.width + rightDelta;
                const contentWidth = Math.max(minContentWidth, contentRect.width);
                const leftEdge = window.innerWidth - CONTENT_MARGIN;
                const clampedRight = clamp(right, [CONTENT_MARGIN, leftEdge - contentWidth]);

                contentWrapper.style.minWidth = minContentWidth + 'px';
                contentWrapper.style.right = clampedRight + 'px';
            }

            // -----------------------------------------------------------------------------------------
            // Vertical positioning
            // -----------------------------------------------------------------------------------------
            const items = getItems();
            const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
            const itemsHeight = viewport.scrollHeight;

            const contentStyles = window.getComputedStyle(content);
            const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
            const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
            const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
            const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
            const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth; // prettier-ignore
            const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);

            const viewportStyles = window.getComputedStyle(viewport);
            const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
            const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);

            const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
            const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;

            const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
            const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
            const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
            const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;

            const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;

            if (willAlignWithoutTopOverflow) {
                const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
                contentWrapper.style.bottom = 0 + 'px';
                const viewportOffsetBottom =
                    content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
                const clampedTriggerMiddleToBottomEdge = Math.max(
                    triggerMiddleToBottomEdge,
                    selectedItemHalfHeight +
                    // viewport might have padding bottom, include it to avoid a scrollable viewport
                    (isLastItem ? viewportPaddingBottom : 0) +
                    viewportOffsetBottom +
                    contentBorderBottomWidth
                );
                const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
                contentWrapper.style.height = height + 'px';
            } else {
                const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
                contentWrapper.style.top = 0 + 'px';
                const clampedTopEdgeToTriggerMiddle = Math.max(
                    topEdgeToTriggerMiddle,
                    contentBorderTopWidth +
                    viewport.offsetTop +
                    // viewport might have padding top, include it to avoid a scrollable viewport
                    (isFirstItem ? viewportPaddingTop : 0) +
                    selectedItemHalfHeight
                );
                const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
                contentWrapper.style.height = height + 'px';
                viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
            }

            contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
            contentWrapper.style.minHeight = minContentHeight + 'px';
            contentWrapper.style.maxHeight = availableHeight + 'px';
            // -----------------------------------------------------------------------------------------

            onPlaced?.();

            // we don't want the initial scroll position adjustment to trigger "expand on scroll"
            // so we explicitly turn it on only after they've registered.
            requestAnimationFrame(() => (shouldExpandOnScrollRef.current = true));
        }
    }, [
        getItems,
        context.trigger,
        context.valueNode,
        contentWrapper,
        content,
        viewport,
        selectedItem,
        selectedItemText,
        context.dir,
        onPlaced,
    ]);

    useLayoutEffect(() => position(), [position]);

    // copy z-index from content to wrapper
    const [contentZIndex, setContentZIndex] = React.useState<string>();
    useLayoutEffect(() => {
        if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);

    // When the viewport becomes scrollable at the top, the scroll up button will mount.
    // Because it is part of the normal flow, it will push down the viewport, thus throwing our
    // trigger => selectedItem alignment off by the amount the viewport was pushed down.
    // We wait for this to happen and then re-run the positining logic one more time to account for it.
    const handleScrollButtonChange = React.useCallback(
        (node: MultiSelectScrollButtonImplElement | null) => {
            if (node && !shouldRepositionRef.current) {
                position();
                focusSelectedItem?.();
                shouldRepositionRef.current = false;
            }
        },
        [position, focusSelectedItem]
    );

    return (
        <MultiSelectViewportProvider
            scope={__scopeSelect}
            contentWrapper={contentWrapper}
            shouldExpandOnScrollRef={shouldExpandOnScrollRef}
            onScrollButtonChange={handleScrollButtonChange}
        >
            <div
                ref={setContentWrapper}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    zIndex: contentZIndex,
                }}
            >
                <Primitive.div
                    {...popperProps}
                    ref={composedRefs}
                    style={{
                        // When we get the height of the content, it includes borders. If we were to set
                        // the height without having `boxSizing: 'border-box'` it would be too big.
                        boxSizing: 'border-box',
                        // We need to ensure the content doesn't get taller than the wrapper
                        maxHeight: '100%',
                        ...popperProps.style,
                    }}
                />
            </div>
        </MultiSelectViewportProvider>
    );
});

MultiSelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectPopperPosition
 * -----------------------------------------------------------------------------------------------*/

const POPPER_POSITION_NAME = 'MultiSelectPopperPosition';

type MultiSelectPopperPositionElement = React.ElementRef<typeof PopperPrimitive.Content>;
type PopperContentProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Content>;
interface MultiSelectPopperPositionProps extends PopperContentProps, MultiSelectPopperPrivateProps {}

const MultiSelectPopperPosition = React.forwardRef<
    MultiSelectPopperPositionElement,
    MultiSelectPopperPositionProps
>((props: ScopedProps<MultiSelectPopperPositionProps>, forwardedRef) => {
    const {
        __scopeSelect,
        align = 'start',
        collisionPadding = CONTENT_MARGIN,
        ...popperProps
    } = props;
    const popperScope = usePopperScope(__scopeSelect);

    return (
        <PopperPrimitive.Content
            {...popperScope}
            {...popperProps}
            ref={forwardedRef}
            align={align}
            collisionPadding={collisionPadding}
            style={{
                // Ensure border-box for floating-ui calculations
                boxSizing: 'border-box',
                ...popperProps.style,
                // re-namespace exposed content custom properties
                ...{
                    '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
                    '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
                    '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
                    '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
                    '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
                },
            }}
        />
    );
});

MultiSelectPopperPosition.displayName = POPPER_POSITION_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectViewport
 * -----------------------------------------------------------------------------------------------*/

type MultiSelectViewportContextValue = {
    contentWrapper?: HTMLDivElement | null;
    shouldExpandOnScrollRef?: React.RefObject<boolean>;
    onScrollButtonChange?: (node: MultiSelectScrollButtonImplElement | null) => void;
};

const [MultiSelectViewportProvider, useMultiSelectViewportContext] =
    createMultiSelectContext<MultiSelectViewportContextValue>(CONTENT_NAME, {});

const VIEWPORT_NAME = 'MultiSelectViewport';

type MultiSelectViewportElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface MultiSelectViewportProps extends PrimitiveDivProps {
    nonce?: string;
}

const MultiSelectViewport = React.forwardRef<MultiSelectViewportElement, MultiSelectViewportProps>(
    (props: ScopedProps<MultiSelectViewportProps>, forwardedRef) => {
        const { __scopeSelect, nonce, ...viewportProps } = props;
        const contentContext = useMultiSelectContentContext(VIEWPORT_NAME, __scopeSelect);
        const viewportContext = useMultiSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
        const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
        const prevScrollTopRef = React.useRef(0);
        return (
            <>
                {/* Hide scrollbars cross-browser and enable momentum scroll for touch devices */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`,
                    }}
                    nonce={nonce}
                />
                <Collection.Slot scope={__scopeSelect}>
                    <Primitive.div
                        data-radix-select-viewport=""
                        role="presentation"
                        {...viewportProps}
                        ref={composedRefs}
                        style={{
                            // we use position: 'relative' here on the `viewport` so that when we call
                            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
                            // (independent of the scrollUpButton).
                            position: 'relative',
                            flex: 1,
                            overflow: 'auto',
                            ...viewportProps.style,
                        }}
                        onScroll={composeEventHandlers(viewportProps.onScroll, (event) => {
                            const viewport = event.currentTarget;
                            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
                            if (shouldExpandOnScrollRef?.current && contentWrapper) {
                                const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
                                if (scrolledBy > 0) {
                                    const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                                    const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                                    const cssHeight = parseFloat(contentWrapper.style.height);
                                    const prevHeight = Math.max(cssMinHeight, cssHeight);

                                    if (prevHeight < availableHeight) {
                                        const nextHeight = prevHeight + scrolledBy;
                                        const clampedNextHeight = Math.min(availableHeight, nextHeight);
                                        const heightDiff = nextHeight - clampedNextHeight;

                                        contentWrapper.style.height = clampedNextHeight + 'px';
                                        if (contentWrapper.style.bottom === '0px') {
                                            viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                                            // ensure the content stays pinned to the bottom
                                            contentWrapper.style.justifyContent = 'flex-end';
                                        }
                                    }
                                }
                            }
                            prevScrollTopRef.current = viewport.scrollTop;
                        })}
                    />
                </Collection.Slot>
            </>
        );
    }
);

MultiSelectViewport.displayName = VIEWPORT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectGroup
 * -----------------------------------------------------------------------------------------------*/

const GROUP_NAME = 'MultiSelectGroup';

type MultiSelectGroupContextValue = { id: string };

const [MultiSelectGroupContextProvider, useMultiSelectGroupContext] =
    createMultiSelectContext<MultiSelectGroupContextValue>(GROUP_NAME);

type MultiSelectGroupElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectGroupProps extends PrimitiveDivProps {}

const MultiSelectGroup = React.forwardRef<MultiSelectGroupElement, MultiSelectGroupProps>(
    (props: ScopedProps<MultiSelectGroupProps>, forwardedRef) => {
        const { __scopeSelect, ...groupProps } = props;
        const groupId = useId();
        return (
            <MultiSelectGroupContextProvider scope={__scopeSelect} id={groupId}>
                <Primitive.div role="group" aria-labelledby={groupId} {...groupProps} ref={forwardedRef} />
            </MultiSelectGroupContextProvider>
        );
    }
);

MultiSelectGroup.displayName = GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectLabel
 * -----------------------------------------------------------------------------------------------*/

const LABEL_NAME = 'MultiSelectLabel';

type MultiSelectLabelElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectLabelProps extends PrimitiveDivProps {}

const MultiSelectLabel = React.forwardRef<MultiSelectLabelElement, MultiSelectLabelProps>(
    (props: ScopedProps<MultiSelectLabelProps>, forwardedRef) => {
        const { __scopeSelect, ...labelProps } = props;
        const groupContext = useMultiSelectGroupContext(LABEL_NAME, __scopeSelect);
        return <Primitive.div id={groupContext.id} {...labelProps} ref={forwardedRef} />;
    }
);

MultiSelectLabel.displayName = LABEL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = 'MultiSelectItem';

type MultiSelectItemContextValue = {
    value: string;
    disabled: boolean;
    textId: string;
    isSelected: boolean;
    onItemTextChange(node: MultiSelectItemTextElement | null): void;
};

const [MultiSelectItemContextProvider, useMultiSelectItemContext] =
    createMultiSelectContext<MultiSelectItemContextValue>(ITEM_NAME);

type MultiSelectItemElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectItemProps extends PrimitiveDivProps {
    value: string;
    disabled?: boolean;
    textValue?: string;
}

const MultiSelectItem = React.forwardRef<MultiSelectItemElement, MultiSelectItemProps>(
    (props: ScopedProps<MultiSelectItemProps>, forwardedRef) => {
        const {
            __scopeSelect,
            value,
            disabled = false,
            textValue: textValueProp,
            ...itemProps
        } = props;
        const context = useMultiSelectContext(ITEM_NAME, __scopeSelect);
        const contentContext = useMultiSelectContentContext(ITEM_NAME, __scopeSelect);
        const isSelected = context.value !== undefined && context.value !== null && context.value.length > 0 && context.value.includes(value);
        const [textValue, setTextValue] = React.useState(textValueProp ?? '');
        const [isFocused, setIsFocused] = React.useState(false);
        const composedRefs = useComposedRefs(forwardedRef, (node) =>
            contentContext.itemRefCallback?.(node, value, disabled)
        );
        const textId = useId();
        const pointerTypeRef = React.useRef<React.PointerEvent['pointerType']>('touch');

        const handleSelect = () => {
            if (!disabled) {
                const currentValues = context.value ?? [];
                const selectedItem = value;

                if (currentValues.includes(selectedItem)) {
                    context.onValueChange(currentValues.filter((value) => value !== selectedItem));
                    return;
                }

                context.onValueChange([...currentValues, selectedItem]);
            }
        };

        if (value === '') {
            throw new Error(
                'A <MultiSelect.Item /> must have a value prop that is not an empty string. This is because the MultiSelect value can be set to an empty string to clear the selection and show the placeholder.'
            );
        }

        return (
            <MultiSelectItemContextProvider
                scope={__scopeSelect}
                value={value}
                disabled={disabled}
                textId={textId}
                isSelected={isSelected}
                onItemTextChange={React.useCallback((node) => {
                    setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? '').trim());
                }, [])}
            >
                <Collection.ItemSlot
                    scope={__scopeSelect}
                    value={value}
                    disabled={disabled}
                    textValue={textValue}
                >
                    <Primitive.div
                        role="option"
                        aria-labelledby={textId}
                        data-highlighted={isFocused ? '' : undefined}
                        // `isFocused` caveat fixes stuttering in VoiceOver
                        aria-selected={isSelected && isFocused}
                        data-state={isSelected ? 'checked' : 'unchecked'}
                        aria-disabled={disabled || undefined}
                        data-disabled={disabled ? '' : undefined}
                        tabIndex={disabled ? undefined : -1}
                        {...itemProps}
                        ref={composedRefs}
                        onFocus={composeEventHandlers(itemProps.onFocus, () => setIsFocused(true))}
                        onBlur={composeEventHandlers(itemProps.onBlur, () => setIsFocused(false))}
                        onClick={composeEventHandlers(itemProps.onClick, () => {
                            // Open on click when using a touch or pen device
                            if (pointerTypeRef.current !== 'mouse') handleSelect();
                        })}
                        onPointerUp={composeEventHandlers(itemProps.onPointerUp, () => {
                            // Using a mouse you should be able to do pointer down, move through
                            // the list, and release the pointer over the item to select it.
                            if (pointerTypeRef.current === 'mouse') handleSelect();
                        })}
                        onPointerDown={composeEventHandlers(itemProps.onPointerDown, (event) => {
                            pointerTypeRef.current = event.pointerType;
                        })}
                        onPointerMove={composeEventHandlers(itemProps.onPointerMove, (event) => {
                            // Remember pointer type when sliding over to this item from another one
                            pointerTypeRef.current = event.pointerType;
                            if (disabled) {
                                contentContext.onItemLeave?.();
                            } else if (pointerTypeRef.current === 'mouse') {
                                // even though safari doesn't support this option, it's acceptable
                                // as it only means it might scroll a few pixels when using the pointer.
                                event.currentTarget.focus({ preventScroll: true });
                            }
                        })}
                        onPointerLeave={composeEventHandlers(itemProps.onPointerLeave, (event) => {
                            if (event.currentTarget === document.activeElement) {
                                contentContext.onItemLeave?.();
                            }
                        })}
                        onKeyDown={composeEventHandlers(itemProps.onKeyDown, (event) => {
                            const isTypingAhead = contentContext.searchRef?.current !== '';
                            if (isTypingAhead && event.key === ' ') return;
                            if (SELECTION_KEYS.includes(event.key)) handleSelect();
                            // prevent page scroll if using the space key to select an item
                            if (event.key === ' ') event.preventDefault();
                        })}
                    />
                </Collection.ItemSlot>
            </MultiSelectItemContextProvider>
        );
    }
);

MultiSelectItem.displayName = ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectItemText
 * -----------------------------------------------------------------------------------------------*/

const ITEM_TEXT_NAME = 'MultiSelectItemText';

type MultiSelectItemTextElement = React.ElementRef<typeof Primitive.span>;
interface MultiSelectItemTextProps extends PrimitiveSpanProps {}

const MultiSelectItemText = React.forwardRef<MultiSelectItemTextElement, MultiSelectItemTextProps>(
    (props: ScopedProps<MultiSelectItemTextProps>, forwardedRef) => {
        // We ignore `className` and `style` as this part shouldn't be styled.
        const { __scopeSelect, className, style, ...itemTextProps } = props;
        const context = useMultiSelectContext(ITEM_TEXT_NAME, __scopeSelect);
        const contentContext = useMultiSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
        const itemContext = useMultiSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
        const nativeOptionsContext = useMultiSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
        const [itemTextNode, setItemTextNode] = React.useState<MultiSelectItemTextElement | null>(null);
        const composedRefs = useComposedRefs(
            forwardedRef,
            (node) => setItemTextNode(node),
            itemContext.onItemTextChange,
            (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled)
        );

        const textContent = itemTextNode?.textContent;
        const nativeOption = React.useMemo(
            () => (
                <option key={itemContext.value} value={itemContext.value} disabled={itemContext.disabled}>
                    {textContent}
                </option>
            ),
            [itemContext.disabled, itemContext.value, textContent]
        );

        const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
        useLayoutEffect(() => {
            onNativeOptionAdd(nativeOption);
            return () => onNativeOptionRemove(nativeOption);
        }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);

        return (
            <>
                <Primitive.span id={itemContext.textId} {...itemTextProps} ref={composedRefs} />

                {/* Portal the select item text into the trigger value node */}
                {itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren
                    ? context.value && context.value.length > 1 ? null : ReactDOM.createPortal(itemTextProps.children, context.valueNode)
                    : null}
            </>
        );
    }
);

MultiSelectItemText.displayName = ITEM_TEXT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectItemIndicator
 * -----------------------------------------------------------------------------------------------*/

const ITEM_INDICATOR_NAME = 'MultiSelectItemIndicator';

type MultiSelectItemIndicatorElement = React.ElementRef<typeof Primitive.span>;
interface MultiSelectItemIndicatorProps extends PrimitiveSpanProps {}

const MultiSelectItemIndicator = React.forwardRef<MultiSelectItemIndicatorElement, MultiSelectItemIndicatorProps>(
    (props: ScopedProps<MultiSelectItemIndicatorProps>, forwardedRef) => {
        const { __scopeSelect, ...itemIndicatorProps } = props;
        const itemContext = useMultiSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
        return itemContext.isSelected ? (
            <Primitive.span aria-hidden {...itemIndicatorProps} ref={forwardedRef} />
        ) : null;
    }
);

MultiSelectItemIndicator.displayName = ITEM_INDICATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectScrollUpButton
 * -----------------------------------------------------------------------------------------------*/

const SCROLL_UP_BUTTON_NAME = 'MultiSelectScrollUpButton';

type MultiSelectScrollUpButtonElement = MultiSelectScrollButtonImplElement;
interface MultiSelectScrollUpButtonProps extends Omit<MultiSelectScrollButtonImplProps, 'onAutoScroll'> {}

const MultiSelectScrollUpButton = React.forwardRef<
    MultiSelectScrollUpButtonElement,
    MultiSelectScrollUpButtonProps
>((props: ScopedProps<MultiSelectScrollUpButtonProps>, forwardedRef) => {
    const contentContext = useMultiSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useMultiSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
    const [canScrollUp, setCanScrollUp] = React.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);

    useLayoutEffect(() => {
        if (contentContext.viewport && contentContext.isPositioned) {
            const viewport = contentContext.viewport;
            const handleScroll = () => {
                const canScrollUp = viewport.scrollTop > 0;
                setCanScrollUp(canScrollUp);
            }
            handleScroll();
            viewport.addEventListener('scroll', handleScroll);
            return () => viewport.removeEventListener('scroll', handleScroll);
        }
    }, [contentContext.viewport, contentContext.isPositioned]);

    return canScrollUp ? (
        <MultiSelectScrollButtonImpl
            {...props}
            ref={composedRefs}
            onAutoScroll={() => {
                const { viewport, selectedItem } = contentContext;
                if (viewport && selectedItem) {
                    viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
                }
            }}
        />
    ) : null;
});

MultiSelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectScrollDownButton
 * -----------------------------------------------------------------------------------------------*/

const SCROLL_DOWN_BUTTON_NAME = 'MultiSelectScrollDownButton';

type MultiSelectScrollDownButtonElement = MultiSelectScrollButtonImplElement;
interface MultiSelectScrollDownButtonProps extends Omit<MultiSelectScrollButtonImplProps, 'onAutoScroll'> {}

const MultiSelectScrollDownButton = React.forwardRef<
    MultiSelectScrollDownButtonElement,
    MultiSelectScrollDownButtonProps
>((props: ScopedProps<MultiSelectScrollDownButtonProps>, forwardedRef) => {
    const contentContext = useMultiSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const viewportContext = useMultiSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
    const [canScrollDown, setCanScrollDown] = React.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);

    useLayoutEffect(() => {
        if (contentContext.viewport && contentContext.isPositioned) {
            const viewport = contentContext.viewport;
            const handleScroll = () => {
                const maxScroll = viewport.scrollHeight - viewport.clientHeight;
                // we use Math.ceil here because if the UI is zoomed-in
                // `scrollTop` is not always reported as an integer
                const canScrollDown = Math.ceil(viewport.scrollTop) < maxScroll;
                setCanScrollDown(canScrollDown);
            }
            handleScroll();
            viewport.addEventListener('scroll', handleScroll);
            return () => viewport.removeEventListener('scroll', handleScroll);
        }
    }, [contentContext.viewport, contentContext.isPositioned]);

    return canScrollDown ? (
        <MultiSelectScrollButtonImpl
            {...props}
            ref={composedRefs}
            onAutoScroll={() => {
                const { viewport, selectedItem } = contentContext;
                if (viewport && selectedItem) {
                    viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
                }
            }}
        />
    ) : null;
});

MultiSelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;

type MultiSelectScrollButtonImplElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectScrollButtonImplProps extends PrimitiveDivProps {
    onAutoScroll(): void;
}

const MultiSelectScrollButtonImpl = React.forwardRef<
    MultiSelectScrollButtonImplElement,
    MultiSelectScrollButtonImplProps
>((props: ScopedProps<MultiSelectScrollButtonImplProps>, forwardedRef) => {
    const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
    const contentContext = useMultiSelectContentContext('MultiSelectScrollButton', __scopeSelect);
    const autoScrollTimerRef = React.useRef<number | null>(null);
    const getItems = useCollection(__scopeSelect);

    const clearAutoScrollTimer = React.useCallback(() => {
        if (autoScrollTimerRef.current !== null) {
            window.clearInterval(autoScrollTimerRef.current);
            autoScrollTimerRef.current = null;
        }
    }, []);

    React.useEffect(() => {
        return () => clearAutoScrollTimer();
    }, [clearAutoScrollTimer]);

    // When the viewport becomes scrollable on either side, the relevant scroll button will mount.
    // Because it is part of the normal flow, it will push down (top button) or shrink (bottom button)
    // the viewport, potentially causing the active item to now be partially out of view.
    // We re-run the `scrollIntoView` logic to make sure it stays within the viewport.
    useLayoutEffect(() => {
        const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
        activeItem?.ref.current?.scrollIntoView({ block: 'nearest' });
    }, [getItems]);

    return (
        <Primitive.div
            aria-hidden
            {...scrollIndicatorProps}
            ref={forwardedRef}
            style={{ flexShrink: 0, ...scrollIndicatorProps.style }}
            onPointerDown={composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
                if (autoScrollTimerRef.current === null) {
                    autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
                }
            })}
            onPointerMove={composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
                contentContext.onItemLeave?.();
                if (autoScrollTimerRef.current === null) {
                    autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
                }
            })}
            onPointerLeave={composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
                clearAutoScrollTimer();
            })}
        />
    );
});

/* -------------------------------------------------------------------------------------------------
 * MultiSelectSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'MultiSelectSeparator';

type MultiSelectSeparatorElement = React.ElementRef<typeof Primitive.div>;
interface MultiSelectSeparatorProps extends PrimitiveDivProps {}

const MultiSelectSeparator = React.forwardRef<MultiSelectSeparatorElement, MultiSelectSeparatorProps>(
    (props: ScopedProps<MultiSelectSeparatorProps>, forwardedRef) => {
        const { __scopeSelect, ...separatorProps } = props;
        return <Primitive.div aria-hidden {...separatorProps} ref={forwardedRef} />;
    }
);

MultiSelectSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * MultiSelectArrow
 * -----------------------------------------------------------------------------------------------*/

const ARROW_NAME = 'MultiSelectArrow';

type MultiSelectArrowElement = React.ElementRef<typeof PopperPrimitive.Arrow>;
type PopperArrowProps = React.ComponentPropsWithoutRef<typeof PopperPrimitive.Arrow>;
interface MultiSelectArrowProps extends PopperArrowProps {}

const MultiSelectArrow = React.forwardRef<MultiSelectArrowElement, MultiSelectArrowProps>(
    (props: ScopedProps<MultiSelectArrowProps>, forwardedRef) => {
        const { __scopeSelect, ...arrowProps } = props;
        const popperScope = usePopperScope(__scopeSelect);
        const context = useMultiSelectContext(ARROW_NAME, __scopeSelect);
        const contentContext = useMultiSelectContentContext(ARROW_NAME, __scopeSelect);
        return context.open && contentContext.position === 'popper' ? (
            <PopperPrimitive.Arrow {...popperScope} {...arrowProps} ref={forwardedRef} />
        ) : null;
    }
);

MultiSelectArrow.displayName = ARROW_NAME;

/* -----------------------------------------------------------------------------------------------*/

function shouldShowPlaceholder(value?: string[]) {
    return !value || value.length === 0;
}

const BubbleMultiSelect = React.forwardRef<HTMLSelectElement, React.ComponentPropsWithoutRef<'select'>>(
    (props, forwardedRef) => {
        const { value, ...selectProps } = props;
        const ref = React.useRef<HTMLSelectElement>(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const prevValue = usePrevious(value);

        // Bubble value change to parents (e.g form change event)
        React.useEffect(() => {
            const select = ref.current!;
            const selectProto = window.HTMLSelectElement.prototype;
            const descriptor = Object.getOwnPropertyDescriptor(
                selectProto,
                'value'
            ) as PropertyDescriptor;
            const setValue = descriptor.set;
            if (prevValue !== value && setValue) {
                const event = new Event('change', { bubbles: true });
                setValue.call(select, value);
                select.dispatchEvent(event);
            }
        }, [prevValue, value]);

        /**
         * We purposefully use a `select` here to support form autofill as much
         * as possible.
         *
         * We purposefully do not add the `value` attribute here to allow the value
         * to be set programmatically and bubble to any parent form `onChange` event.
         * Adding the `value` will cause React to consider the programmatic
         * dispatch a duplicate and it will get swallowed.
         *
         * We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
         * won't work otherwise.
         */
        return (
            <VisuallyHidden asChild>
                <select {...selectProps} ref={composedRefs} />
            </VisuallyHidden>
        );
    }
);

BubbleMultiSelect.displayName = 'BubbleSelect';

function useTypeaheadSearch(onSearchChange: (search: string) => void) {
    const handleSearchChange = useCallbackRef(onSearchChange);
    const searchRef = React.useRef('');
    const timerRef = React.useRef(0);

    const handleTypeaheadSearch = React.useCallback(
        (key: string) => {
            const search = searchRef.current + key;
            handleSearchChange(search);

            (function updateSearch(value: string) {
                searchRef.current = value;
                window.clearTimeout(timerRef.current);
                // Reset `searchRef` 1 second after it was last updated
                if (value !== '') timerRef.current = window.setTimeout(() => updateSearch(''), 1000);
            })(search);
        },
        [handleSearchChange]
    );

    const resetTypeahead = React.useCallback(() => {
        searchRef.current = '';
        window.clearTimeout(timerRef.current);
    }, []);

    React.useEffect(() => {
        return () => window.clearTimeout(timerRef.current);
    }, []);

    return [searchRef, handleTypeaheadSearch, resetTypeahead] as const;
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in a list of items,
 * the search and the current item, and returns the next item (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through items starting with that character)
 *
 * We also reorder the items by wrapping the array around the current item.
 * This is so we always look forward from the current item, and picking the first
 * item will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current item from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current item still matches.
 */
function findNextItem<T extends { textValue: string }>(
    items: T[],
    search: string
) {
    const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
    const normalizedSearch = isRepeated ? search[0] : search;

    return items.find((item) =>
        item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
    );
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */

const Root = MultiSelect;
const Trigger = MultiSelectTrigger;
const Value = MultiSelectValue;
const Icon = MultiSelectIcon;
const Portal = MultiSelectPortal;
const Content = MultiSelectContent;
const Viewport = MultiSelectViewport;
const Group = MultiSelectGroup;
const Label = MultiSelectLabel;
const Item = MultiSelectItem;
const ItemText = MultiSelectItemText;
const ItemIndicator = MultiSelectItemIndicator;
const ScrollUpButton = MultiSelectScrollUpButton;
const ScrollDownButton = MultiSelectScrollDownButton;
const Separator = MultiSelectSeparator;
const Arrow = MultiSelectArrow;

export {
    createMultiSelectScope,
    //
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectIcon,
    MultiSelectPortal,
    MultiSelectContent,
    MultiSelectViewport,
    MultiSelectGroup,
    MultiSelectLabel,
    MultiSelectItem,
    MultiSelectItemText,
    MultiSelectItemIndicator,
    MultiSelectScrollUpButton,
    MultiSelectScrollDownButton,
    MultiSelectSeparator,
    MultiSelectArrow,
    //
    Root,
    Trigger,
    Value,
    Icon,
    Portal,
    Content,
    Viewport,
    Group,
    Label,
    Item,
    ItemText,
    ItemIndicator,
    ScrollUpButton,
    ScrollDownButton,
    Separator,
    Arrow,
};
export type {
    MultiSelectProps,
    MultiSelectTriggerProps,
    MultiSelectValueProps,
    MultiSelectIconProps,
    MultiSelectPortalProps,
    MultiSelectContentProps,
    MultiSelectViewportProps,
    MultiSelectGroupProps,
    MultiSelectLabelProps,
    MultiSelectItemProps,
    MultiSelectItemTextProps,
    MultiSelectItemIndicatorProps,
    MultiSelectScrollUpButtonProps,
    MultiSelectScrollDownButtonProps,
    MultiSelectSeparatorProps,
    MultiSelectArrowProps,
};
