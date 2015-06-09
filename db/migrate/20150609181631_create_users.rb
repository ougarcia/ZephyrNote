class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, index: true, unique: true
      t.string :password_digest, null: false, index: true, unique: true
      t.string :session_token, null: false, index: true, unique: true

      t.timestamps null: false
    end
  end
end
