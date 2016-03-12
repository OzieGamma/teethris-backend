class PlayersController < ApplicationController

  def create
    @player = Player.new(name: params[:name])
    @player.save

    render status: 200, text:"ok!"
  end

  def index
    render json:Player.all
  end
end
