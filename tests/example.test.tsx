import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Home } from '../src/pages/Home';
import LoginPage from '../src/pages/LoginPage';
import { authService } from '../src/services/authService';

const mocks = vi.hoisted(() => ({
  loginContext: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}));

vi.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: mocks.loginContext,
  }),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    error: mocks.toastError,
    success: mocks.toastSuccess,
  },
}));

describe('landing and auth flows', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the corrected Karsoogh landing heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /کارسوق ریاضی مهرگان، دوره ۲۶/ }),
    ).toBeInTheDocument();
  });

  it('renders the main landing sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'کارسوق؟ کارسوق کیه؟' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'از ثبت‌نام تا تجربه حضوری' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'سوالات متداول' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'تیم دوره ۲۶' })).toBeInTheDocument();
  });

  it('renders the login form fields and submit control', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('نام کاربری')).toBeInTheDocument();
    expect(screen.getByLabelText('رمز عبور')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ورود به پنل' })).toBeInTheDocument();
  });

  it('shows an inline error when login fails', async () => {
    vi.spyOn(authService, 'login').mockRejectedValueOnce(
      new Error('نام کاربری یا رمز عبور نادرست است'),
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('نام کاربری'), { target: { value: 'student' } });
    fireEvent.change(screen.getByLabelText('رمز عبور'), { target: { value: 'wrong-pass' } });
    fireEvent.click(screen.getByRole('button', { name: 'ورود به پنل' }));

    expect(screen.getByRole('button', { name: 'در حال ورود...' })).toBeDisabled();

    expect(await screen.findByRole('alert')).toHaveTextContent('نام کاربری یا رمز عبور نادرست است');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'ورود به پنل' })).toBeEnabled();
    });
  });

  it('does not submit empty login credentials', async () => {
    const loginSpy = vi.spyOn(authService, 'login');

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.submit(screen.getByRole('button', { name: 'ورود به پنل' }).closest('form')!);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'نام کاربری و رمز عبور را وارد کنید.',
    );
    expect(loginSpy).not.toHaveBeenCalled();
  });
});
