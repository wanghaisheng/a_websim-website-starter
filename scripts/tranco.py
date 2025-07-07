def get_tranco_data() -> Iterator[tuple[int, str]]:
    id_resp = httpx.get(
        "https://tranco-list.eu/api/lists/date/latest?subdomains=true",
        follow_redirects=True,
    )
    id_resp.raise_for_status()
    list_id = id_resp.json()["list_id"]
    data_resp = httpx.get(
        f"https://tranco-list.eu/download/{list_id}/1000000", follow_redirects=True
    )
    data_resp.raise_for_status()
    for row in csv.reader(data_resp.iter_lines()):
        yield int(row[0]), row[1]
