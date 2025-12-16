from .data_loader import load_json

def combine_cf(cf1, cf2):
    return cf1 + cf2 * (1 - cf1)

def forward_chaining_cf(user_gejala):
    rules = load_json("rules.json")
    hasil = {}

    for rule in rules:
        penyakit = rule["penyakit"]
        gejala = rule["gejala"]
        cf_pakar = rule["cf_pakar"]

        for ug in user_gejala:
            if ug["id"] == gejala:
                cf_rule = ug["cf_user"] * cf_pakar

                if penyakit not in hasil:
                    hasil[penyakit] = cf_rule
                else:
                    hasil[penyakit] = combine_cf(
                        hasil[penyakit],
                        cf_rule
                    )

    return hasil
