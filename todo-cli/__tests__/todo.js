/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const formattedDate = (d) => {
  return d.toISOString().slice(0, 10);
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      dueDate: today,
      completed: false,
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    // const overdueItems = all.filter(
    //   (item) => item.dueDate < new Date().toISOString().slice(0, 10)
    // );
    const overdueItemsCount = overdue().length;
    add({
      title: "Test overDue",
      dueDate: yesterday,
      completed: false,
    });
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(overdueItemsCount + 1);
    expect(overdueItems[0].dueDate).toEqual(yesterday);
    expect(overdueItems[0].title).toEqual("Test overDue");
  });

  test("Should retrieve today items", () => {
    // const dueTodayItems = all.filter(
    //   (item) => item.dueDate === new Date().toISOString().slice(0, 10)
    // );
    // expect(dueToday()).toEqual(dueTodayItems);
    const dueTodayItemsCount = dueToday().length;
    add({
      title: "Test dueToday",
      completed: false,
      dueDate: today,
    });
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBe(dueTodayItemsCount + 1);
    expect(dueTodayItems[0].dueDate).toEqual(today);
    expect(dueTodayItems[0].title).toEqual("Test todo");
    expect(dueTodayItems[2].dueDate).toEqual(today);
    expect(dueTodayItems[2].title).toEqual("Test dueToday");
  });

  test("Should retrieve due later items", () => {
    //   const dueLaterItems = all.filter(
    //     (item) => item.dueDate > new Date().toISOString().slice(0, 10)
    //   );
    //   expect(dueLater()).toEqual(dueLaterItems);
    // });
    const dueLaterItemsCount = dueLater().length;
    add({
      title: "Test dueLater",
      dueDate: tomorrow,
      completed: false,
    });
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(dueLaterItemsCount + 1);
    expect(dueLaterItems[0].dueDate).toEqual(tomorrow);
    expect(dueLaterItems[0].title).toEqual("Test dueLater");
  });
});
