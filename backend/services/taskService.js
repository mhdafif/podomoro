const Task = require('../models/Task');
const Report = require('../models/Report');
const User = require('../models/User');
const { Op } = require('sequelize');

class TaskService {
  // Create a new task
  async createTask(userId, taskData) {
    try {
      const task = await Task.create({
        ...taskData,
        userId,
      });

      return await this.getTaskById(task.id);
    } catch (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }
  }

  // Get all tasks for a user
  async getUserTasks(userId, options = {}) {
    try {
      const { status, page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const whereClause = { userId };
      if (status) {
        whereClause.status = status;
      }

      const tasks = await Task.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: Report,
            as: 'reports',
            attributes: ['id', 'date', 'completeMinutes'],
          },
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        tasks: tasks.rows,
        totalCount: tasks.count,
        totalPages: Math.ceil(tasks.count / limit),
        currentPage: parseInt(page),
      };
    } catch (error) {
      throw new Error(`Failed to get user tasks: ${error.message}`);
    }
  }

  // Get task by ID
  async getTaskById(taskId) {
    try {
      const task = await Task.findByPk(taskId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: Report,
            as: 'reports',
            attributes: ['id', 'date', 'completeMinutes'],
            order: [['date', 'DESC']],
          },
        ],
      });

      if (!task) {
        throw new Error('Task not found');
      }

      return task;
    } catch (error) {
      throw new Error(`Failed to get task: ${error.message}`);
    }
  }

  // Update task
  async updateTask(taskId, userId, updateData) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new Error('Task not found or access denied');
      }

      await task.update(updateData);
      return await this.getTaskById(taskId);
    } catch (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }
  }

  // Delete task
  async deleteTask(taskId, userId) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new Error('Task not found or access denied');
      }

      await task.destroy();
      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  // Get task statistics
  async getTaskStatistics(userId, options = {}) {
    try {
      const { startDate, endDate } = options;

      // Build where clause for reports
      const reportWhere = {};
      if (startDate) reportWhere.date = { [Op.gte]: startDate };
      if (endDate) {
        reportWhere.date = {
          ...reportWhere.date,
          [Op.lte]: endDate,
        };
      }

      const tasks = await Task.findAll({
        where: { userId },
        include: [
          {
            model: Report,
            as: 'reports',
            where:
              Object.keys(reportWhere).length > 0 ? reportWhere : undefined,
            required: false,
            attributes: ['completeMinutes', 'date'],
          },
        ],
        attributes: ['id', 'name', 'status'],
      });

      const statistics = {
        totalTasks: tasks.length,
        activeTasks: tasks.filter((t) => t.status === 'active').length,
        inactiveTasks: tasks.filter((t) => t.status === 'inactive').length,
        totalMinutes: 0,
        tasksWithReports: 0,
      };

      tasks.forEach((task) => {
        const taskMinutes = task.reports.reduce(
          (sum, report) => sum + report.completeMinutes,
          0,
        );
        statistics.totalMinutes += taskMinutes;
        if (task.reports.length > 0) {
          statistics.tasksWithReports++;
        }
      });

      return statistics;
    } catch (error) {
      throw new Error(`Failed to get task statistics: ${error.message}`);
    }
  }

  // Add report to task
  async addTaskReport(taskId, userId, reportData) {
    try {
      // Verify task belongs to user
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new Error('Task not found or access denied');
      }

      const report = await Report.create({
        ...reportData,
        taskId,
      });

      return await Report.findByPk(report.id, {
        include: [
          {
            model: Task,
            as: 'task',
            attributes: ['id', 'name', 'status'],
          },
        ],
      });
    } catch (error) {
      throw new Error(`Failed to add task report: ${error.message}`);
    }
  }

  // Get reports for a task
  async getTaskReports(taskId, userId, options = {}) {
    try {
      // Verify task belongs to user
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw new Error('Task not found or access denied');
      }

      const { startDate, endDate, page = 1, limit = 10 } = options;
      const offset = (page - 1) * limit;

      const whereClause = { taskId };
      if (startDate) whereClause.date = { [Op.gte]: startDate };
      if (endDate) {
        whereClause.date = {
          ...whereClause.date,
          [Op.lte]: endDate,
        };
      }

      const reports = await Report.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Task,
            as: 'task',
            attributes: ['id', 'name', 'status'],
          },
        ],
        order: [['date', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return {
        reports: reports.rows,
        totalCount: reports.count,
        totalPages: Math.ceil(reports.count / limit),
        currentPage: parseInt(page),
      };
    } catch (error) {
      throw new Error(`Failed to get task reports: ${error.message}`);
    }
  }
}

module.exports = new TaskService();
