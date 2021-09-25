import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Verifica se componentes necessários estão na tela', () => {

  afterEach(() => {
    localStorage.clear();
  })

  it('Verifica título', () => {
    const home = render(<App />);
    expect(home.getByText('To-do List ✓')).toBeInTheDocument();
  });

  it('verifica input', () => {
    const home = render(<App />);
    expect(home.getByPlaceholderText('Add a task')).toBeInTheDocument();
  });

  it('verifica botões', () => {
    const home = render(<App />);
    const buttons = ['Add task', 'Finish / Unfinish', 'Remove Done Tasks', 'Clear Tasks'];
    
    expect(home.getAllByRole('button').length).toBe(4);
    home.getAllByRole('button').forEach((button, index) => {
      expect(button).toHaveTextContent(buttons[index]);
    });
  })
});
