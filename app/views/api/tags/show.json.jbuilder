json.(@tag, :id, :title, :created_at, :updated_at)
json.notes do
  json.array! @tag.notes do |note|
    json.(note, *Note.column_names)
  end
end
