json.models do
  json.array! @notes do |note|
    json.(note, *Note.column_names)
    json.tags do
      json.array! note.tags do |tag|
        json.(tag, *Tag.column_names)
      end
    end
  end
end

json.page @page
json.total_pages @total_pages
