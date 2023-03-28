/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = all.filter(
      (item) => item.dueDate < new Date().toISOString().slice(0, 10)
    );
    expect(overdue()).toEqual(overdueItems);
  });

  test("Should retrieve today items", () => {
    const dueTodayItems = all.filter(
      (item) => item.dueDate === new Date().toISOString().slice(0, 10)
    );
    expect(dueToday()).toEqual(dueTodayItems);
  });

  test("Should retrieve due later items", () => {
    const dueLaterItems = all.filter(
      (item) => item.dueDate > new Date().toISOString().slice(0, 10)
    );
    expect(dueLater()).toEqual(dueLaterItems);
  });
});
