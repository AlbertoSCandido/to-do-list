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

describe('Testa comportamentos de usuário', () => {

  afterEach(() => {
    localStorage.clear();
  })

  it('verifica adição de tarefa', () => {
    const home = render(<App />);
    const input = home.getByPlaceholderText('Add a task');
    const button = home.getByText('Add task');

    fireEvent.change(input, {target: {value: 'Teste'}});
    expect(input.value).toBe('Teste');

    fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('verifica se tarefa foi adicionada', () => {
    const home = render(<App />);
    const input = home.getByPlaceholderText('Add a task');
    const button = home.getByText('Add task');

    fireEvent.change(input, {target: {value: 'Primeiro'}});
    fireEvent.click(button);

    fireEvent.change(input, {target: {value: 'Segundo'}});
    fireEvent.keyPress(input, {key: 'Enter', code: 13, charCode: 13});

    expect(home.getByText('Primeiro')).toBeInTheDocument();
    expect(home.getByText('Segundo')).toBeInTheDocument();
  });

  it('verifica se tarefa foi adicionada e está marcada como finalizada e se pode ser desmarcada', () => {
    const home = render(<App />);
    const input = home.getByPlaceholderText('Add a task');
    const button = home.getByText('Add task');
    const finishButton = home.getByText('Finish / Unfinish');

    fireEvent.change(input, {target: {value: 'Terceiro'}});
    fireEvent.click(button);

    const task = home.getByText('Terceiro');
    fireEvent.click(task);
    fireEvent.click(finishButton);
    
    expect(task.parentElement).toHaveClass('doneTask');

    fireEvent.click(task);
    fireEvent.click(finishButton);

    expect(task.parentElement).not.toHaveClass('doneTask');
  });
});
