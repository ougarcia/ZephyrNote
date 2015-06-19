json.(@note, *Note.column_names)
json.tags do
  json.array! @note.tags do |tag|
    json.(tag, *Tag.column_names)
  end
end
