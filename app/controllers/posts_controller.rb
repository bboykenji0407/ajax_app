class PostsController < ApplicationController
  def index  # indexアクションを定義した
    @posts = Post.order(id: "DESC")
  end
 
  #def new　必要ないのでコメントアウト
  #end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index #　追記する
  end
end
