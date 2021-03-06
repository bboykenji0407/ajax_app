class PostsController < ApplicationController
  def index  # indexアクションを定義した
    # binding.pry
    @posts = Post.order(id: "DESC")
  end
  #def new　必要ないのでコメントアウト
  #end
  def create
    #binding.pry
    post = Post.create(content: params[:content]) #post =を追記、新たに投稿されたメモの内容を変数postに格納
    render json:{ post: post }  #redirect_to action: :index renderメソッドを使ってをレスポンスで返却される
  end                   #データフォーマットにjsonを指定
end
