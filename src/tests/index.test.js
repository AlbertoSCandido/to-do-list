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

  it('Verifica deleção de uma tarefa, tarefas concluidas e todas as tarefas', () => {
    const home = render(<App />);
    const input = home.getByPlaceholderText('Add a task');
    const button = home.getByText('Add task');
    const finishButton = home.getByText('Finish / Unfinish');
    const removeDoneTaskButton = home.getByText('Remove Done Tasks');
    const clearButton = home.getByText('Clear Tasks');

    fireEvent.change(input, {target: {value: 'Primeiro'}});
    fireEvent.click(button);

    fireEvent.change(input, {target: {value: 'Segundo'}});
    fireEvent.keyPress(input, {key: 'Enter', code: 13, charCode: 13});

    fireEvent.change(input, {target: {value: 'Terceiro'}});
    fireEvent.click(button);

    fireEvent.change(input, {target: {value: 'Quarto'}});
    fireEvent.click(button);

    const task1 = home.getByText('Primeiro');
    const task2 = home.getByText('Segundo');
    const deleteTaskOneButton = home.getAllByText('Delete')[0];
    const deleteTaskTwoButton = home.getAllByText('Delete')[1];
    fireEvent.click(deleteTaskOneButton);
    fireEvent.click(deleteTaskTwoButton);
    expect(task1).not.toBeInTheDocument();
    expect(task2).not.toBeInTheDocument();

    const task3 = home.getByText('Terceiro');
    fireEvent.click(task3);
    fireEvent.click(finishButton);
    fireEvent.click(removeDoneTaskButton);
    expect(task3).not.toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(home.queryByText('Primeiro')).not.toBeInTheDocument();
    expect(home.queryByText('Segundo')).not.toBeInTheDocument();
    expect(home.queryByText('Terceiro')).not.toBeInTheDocument();
    expect(home.queryByText('Quarto')).not.toBeInTheDocument();
  });

  it('Verificar permanencia de dados em localStorage após recarregar página', () => {
    const home = render(<App />);
    const input = home.getByPlaceholderText('Add a task');
    const button = home.getByText('Add task');
    const finishButton = home.getByText('Finish / Unfinish');
    const removeDoneTaskButton = home.getByText('Remove Done Tasks');

    fireEvent.change(input, {target: {value: 'Primeiro'}});
    fireEvent.click(button);

    fireEvent.change(input, {target: {value: 'Segundo'}});
    fireEvent.keyPress(input, {key: 'Enter', code: 13, charCode: 13});

    fireEvent.change(input, {target: {value: 'Terceiro'}});
    fireEvent.click(button);

    fireEvent.change(input, {target: {value: 'Quarto'}});
    fireEvent.click(button);

    expect(JSON.parse(localStorage.getItem('list')).length).toBe(4);
    expect(JSON.parse(localStorage.getItem('list'))[0].task).toBe('Primeiro');

    const task1 = home.getByText('Primeiro');
    fireEvent.click(task1);
    fireEvent.click(finishButton);

    const task2 = home.getByText('Segundo');
    fireEvent.click(task2);
    fireEvent.click(finishButton);

    expect(JSON.parse(localStorage.getItem('doneTasks')).length).toBe(2);

    fireEvent.click(removeDoneTaskButton);
    expect(JSON.parse(localStorage.getItem('doneTasks')).length).toBe(0);
    expect(JSON.parse(localStorage.getItem('list')).length).toBe(2);

    window.window.location.replace('/');
    expect(home.getByText('Terceiro')).toBeInTheDocument();
    expect(home.getByText('Quarto')).toBeInTheDocument();
  });
});
