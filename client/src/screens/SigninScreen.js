import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, redirectUser, showLoading, showMessage } from '../utils';

const SigninScreen = {
  after_render: () => {
    document.getElementById('signin-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await signin({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      });
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        redirectUser();
      }
    });
  },
  render: () => {
    if (getUserInfo().name) {
      redirectUser();
    }
    return `
      <div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign-In</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="text" id="email" name="email" value="admin@example.com"/>
            </li>
            <li>
              <label for="password">Password</label>
              <input type="password" id="password" name="password" value="1234"/>
            </li>
            <li>
              <button type="submit" class="primary">Sign-In</button>
            </li>
            <li>
              <div>
              New User?
              <a href="/#/register">Create an account</a>
            </li>
          </ul>
        </form>
      </div>
      `;
  },
};

export default SigninScreen;
