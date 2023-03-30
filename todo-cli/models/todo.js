// models/todo.js
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

const todoList = require("../todo");
const today = new Date().toISOString().split("T")[0];

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Todo list \n");
      const str3 = await Todo.display();
      console.log(str3);
      console.log("\n");

      console.log("Overdue");
      // FILL IN HERE
      const overDues = await Todo.overdue();
      console.log(overDues);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const todayDues = await Todo.dueToday();
      console.log(todayDues);
      console.log("\n");

      console.log("Due Later");
      const laterDues = await Todo.dueLater();
      console.log(laterDues);
      // FILL IN HERE
    }

    static async display() {
      const todos = await Todo.findAll();
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      return todoList;
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const todos = await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: today },
        },
      });
      const overdueList = todos
        .map((todo) => todo.displayableString())
        .join("\n");
      return overdueList;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const todos = await Todo.findAll({
        where: {
          dueDate: today,
        },
      });
      const dueTodayList = todos
        .map((todo) => todo.displayableString())
        .join("\n");
      return dueTodayList;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const todos = await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: today },
        },
      });
      if (todos) {
        const dueLaterList = todos
          .map((todo) => todo.displayableString())
          .join("\n");
        return dueLaterList;
      } else {
        return "No tasks due later.";
      }
      // const todoList = todos.map(todo => todo.displayableString()).join("\n");
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const task = await Todo.findByPk(id);
      task.completed = true;
      return await task.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().slice(0, 10);
      if (this.dueDate === today) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
      logging: false,
    }
  );
  return Todo;
};
