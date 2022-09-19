# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]
  before_action :get_all_todo_lists, only: [:reset_todo_items, :edit_todo_item]

  def landing
    @todos = Todo.all.order(:id)
  end

  def edit_todo_item
    @todo_item.update(todo_item_params)
    render json: @todos
  end

  def reset_todo_items
    Todo.update_all(checked: false)
    render json: @todos
  end

  private

  def todo_item_params
    params.permit(:id, :title, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end

  def get_all_todo_lists
    @todos = Todo.all.order(:id)
  end
end
