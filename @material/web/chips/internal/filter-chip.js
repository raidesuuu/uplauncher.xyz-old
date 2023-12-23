/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { __decorate } from "tslib";
import '../../elevation/elevation.js';
import { html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { redispatchEvent } from '../../internal/controller/events.js';
import { MultiActionChip } from './multi-action-chip.js';
import { renderRemoveButton } from './trailing-icons.js';
/**
 * A filter chip component.
 *
 * @fires remove {Event} Dispatched when the remove button is clicked.
 */
export class FilterChip extends MultiActionChip {
    constructor() {
        super(...arguments);
        this.elevated = false;
        this.removable = false;
        this.selected = false;
        /**
         * Only needed for SSR.
         *
         * Add this attribute when a filter chip has a `slot="selected-icon"` to avoid
         * a Flash Of Unstyled Content.
         */
        this.hasSelectedIcon = false;
    }
    get primaryId() {
        return 'button';
    }
    getContainerClasses() {
        return {
            ...super.getContainerClasses(),
            elevated: this.elevated,
            selected: this.selected,
            'has-trailing': this.removable,
            'has-icon': this.hasIcon || this.selected,
        };
    }
    renderPrimaryAction(content) {
        const { ariaLabel } = this;
        return html `
      <button
        class="primary action"
        id="button"
        aria-label=${ariaLabel || nothing}
        aria-pressed=${this.selected}
        ?disabled=${this.disabled && !this.alwaysFocusable}
        @click=${this.handleClick}
        >${content}</button
      >
    `;
    }
    renderLeadingIcon() {
        if (!this.selected) {
            return super.renderLeadingIcon();
        }
        return html `
      <slot name="selected-icon">
        <svg class="checkmark" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M6.75012 12.1274L3.62262 8.99988L2.55762 10.0574L6.75012 14.2499L15.7501 5.24988L14.6926 4.19238L6.75012 12.1274Z" />
        </svg>
      </slot>
    `;
    }
    renderTrailingAction(focusListener) {
        if (this.removable) {
            return renderRemoveButton({
                focusListener,
                ariaLabel: this.ariaLabelRemove,
                disabled: this.disabled,
            });
        }
        return nothing;
    }
    renderOutline() {
        if (this.elevated) {
            return html `<md-elevation></md-elevation>`;
        }
        return super.renderOutline();
    }
    handleClick(event) {
        if (this.disabled) {
            return;
        }
        this.selected = !this.selected;
        const preventDefault = !redispatchEvent(this, event);
        if (preventDefault) {
            this.selected = !this.selected;
            return;
        }
    }
}
__decorate([
    property({ type: Boolean })
], FilterChip.prototype, "elevated", void 0);
__decorate([
    property({ type: Boolean })
], FilterChip.prototype, "removable", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FilterChip.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'has-selected-icon' })
], FilterChip.prototype, "hasSelectedIcon", void 0);
__decorate([
    query('.primary.action')
], FilterChip.prototype, "primaryAction", void 0);
__decorate([
    query('.trailing.action')
], FilterChip.prototype, "trailingAction", void 0);
//# sourceMappingURL=filter-chip.js.map