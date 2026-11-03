/**
 * Legacy router redirect to Business Management
 */
import { renderBusiness } from "./business.js";

export function renderEcommerce(container) {
  renderBusiness(container);
}
