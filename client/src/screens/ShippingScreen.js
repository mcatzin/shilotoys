import CheckoutSteps from '../components/CheckoutSteps';
import { getUserInfo, getShipping, setShipping } from '../localStorage';

const ShippingScreen = {
  after_render: () => {
    document.getElementById('shipping-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      setShipping({
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value,
      });
      document.location.hash = '/payment';
    });
  },
  render: () => {
    const { address, city, postalCode, country } = getShipping();
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    ${CheckoutSteps.render({ step1: true, step2: true })}
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1>User Profile</h1>
            </li>
            <li>
              <label for="name">Address</label>
              <input type="text" id="address" name="address" value="${address}"/>
            </li>
            <li>
              <label for="name">City</label>
              <input type="text" id="city" name="city" value="${city}"/>
            </li>
            <li>
              <label for="name">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value="${postalCode}"/>
            </li>
            <li>
              <label for="name">Country</label>
              <input type="text" id="country" name="country" value="${country}"/>
            </li>
            <li>
              <button type="submit" class="primary">Continue</button>
            </li>
          </ul>
        </form>
      </div>
      `;
  },
};

export default ShippingScreen;
